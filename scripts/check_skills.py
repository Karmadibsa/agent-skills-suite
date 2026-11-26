#!/usr/bin/env python3
"""Vérifie la structure de la suite de skills.

Usage :
    python scripts/check_skills.py          # vérifie, code de sortie 1 en cas d'erreur
    python scripts/check_skills.py --fix    # recopie shared/skill-preamble.md dans chaque SKILL.md

Contrôles :
- frontmatter YAML : name (= nom du dossier, minuscules/chiffres/tirets, <= 64 car.)
  et description (non vide, <= 1024 car.) ;
- SKILL.md de moins de 500 lignes ;
- chaque `references/*.md` cité dans SKILL.md existe, et chaque fiche est citée (sinon avertissement) ;
- le bloc commun (shared/skill-preamble.md) est présent et à jour dans chaque SKILL.md ;
- aucun tableau aplati par un export Google Docs (suite de lignes courtes isolées).
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "skills"
PREAMBLE_SRC = ROOT / "shared" / "skill-preamble.md"
START = "<!-- suite:preamble:start — généré depuis shared/skill-preamble.md, ne pas modifier ici -->"
END = "<!-- suite:preamble:end -->"
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
REF_RE = re.compile(r"references/[A-Za-z0-9_.-]+\.md")
SECTION_ONE_RE = re.compile(r"^#{1,2} 1\. ")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8").replace("\r\n", "\n")


def frontmatter(text: str) -> dict[str, str] | None:
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end == -1:
        return None
    fields: dict[str, str] = {}
    for line in text[4:end].split("\n"):
        m = re.match(r"^([a-z_-]+):\s*(.*)$", line)
        if m:
            fields[m.group(1)] = m.group(2).strip().strip('"')
    return fields


def preamble_block() -> str:
    return f"{START}\n\n{read(PREAMBLE_SRC).strip()}\n\n{END}"


def sync_preamble(text: str) -> str:
    block = preamble_block()
    if START in text and END in text:
        before, rest = text.split(START, 1)
        _, after = rest.split(END, 1)
        return before + block + after
    lines = text.split("\n")
    idx = next((i for i, l in enumerate(lines) if SECTION_ONE_RE.match(l)), None)
    if idx is None:
        raise ValueError("aucune section « 1. » où insérer le bloc commun")
    return "\n".join(lines[:idx] + [block, ""] + lines[idx:])


def flattened_runs(text: str, min_run: int = 6) -> list[int]:
    """Lignes de début des suites de paragraphes courts d'une seule ligne (tableau aplati)."""
    runs, run, start, in_fence = [], 0, 0, False
    blocks: list[tuple[int, list[str]]] = []
    cur: list[str] = []
    cur_start = 0
    for i, line in enumerate(text.split("\n"), 1):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            if cur:
                blocks.append((cur_start, cur))
                cur = []
            blocks.append((i, ["```"]))
            continue
        if in_fence:
            continue
        if line.strip():
            if not cur:
                cur_start = i
            cur.append(line.strip())
        elif cur:
            blocks.append((cur_start, cur))
            cur = []
    if cur:
        blocks.append((cur_start, cur))
    for lineno, blk in blocks:
        cell = len(blk) == 1 and len(blk[0]) < 80 and not re.match(r"^(#|- |\* |> |\||\d+\. |```|<|\*\*)", blk[0])
        if cell:
            if run == 0:
                start = lineno
            run += 1
        else:
            if run >= min_run:
                runs.append(start)
            run = 0
    if run >= min_run:
        runs.append(start)
    return runs


def main() -> int:
    fix = "--fix" in sys.argv
    errors: list[str] = []
    warnings: list[str] = []
    skill_dirs = sorted(p for p in SKILLS.iterdir() if p.is_dir())
    for d in skill_dirs:
        skill_md = d / "SKILL.md"
        rel = skill_md.relative_to(ROOT).as_posix()
        if not skill_md.exists():
            errors.append(f"{d.name}: SKILL.md manquant")
            continue
        text = read(skill_md)
        if fix:
            try:
                new = sync_preamble(text)
            except ValueError as exc:
                errors.append(f"{rel}: {exc}")
                new = text
            if new != text:
                skill_md.write_text(new, encoding="utf-8")
                print(f"bloc commun mis à jour : {rel}")
                text = new
        fm = frontmatter(text)
        if fm is None:
            errors.append(f"{rel}: frontmatter YAML absent ou mal fermé")
        else:
            name, desc = fm.get("name", ""), fm.get("description", "")
            if name != d.name:
                errors.append(f"{rel}: name « {name} » différent du dossier « {d.name} »")
            if not NAME_RE.match(name) or len(name) > 64:
                errors.append(f"{rel}: name invalide « {name} »")
            if not desc:
                errors.append(f"{rel}: description vide")
            elif len(desc) > 1024:
                errors.append(f"{rel}: description de {len(desc)} caractères (> 1024)")
        n_lines = text.count("\n") + 1
        if n_lines > 500:
            errors.append(f"{rel}: {n_lines} lignes (> 500), déplacer du contenu vers references/")
        if START not in text or END not in text:
            errors.append(f"{rel}: bloc commun absent (lancer --fix)")
        elif preamble_block() not in text:
            errors.append(f"{rel}: bloc commun obsolète (lancer --fix)")
        cited = set(REF_RE.findall(text))
        for ref in sorted(cited):
            if not (d / ref).exists():
                errors.append(f"{rel}: référence introuvable {ref}")
        ref_dir = d / "references"
        if ref_dir.is_dir():
            for f in sorted(ref_dir.glob("*.md")):
                if f"references/{f.name}" not in cited:
                    warnings.append(f"{rel}: references/{f.name} n'est cité nulle part dans SKILL.md")
    md_files = [ROOT / "README.md", *sorted((ROOT / "docs").rglob("*.md")), *sorted(SKILLS.rglob("*.md"))]
    for f in md_files:
        for line in flattened_runs(read(f)):
            errors.append(f"{f.relative_to(ROOT).as_posix()}:{line}: tableau probablement aplati (lignes courtes isolées)")
    for w in warnings:
        print(f"avertissement : {w}")
    for e in errors:
        print(f"ERREUR : {e}")
    print(f"{len(skill_dirs)} skills vérifiés, {len(errors)} erreur(s), {len(warnings)} avertissement(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
