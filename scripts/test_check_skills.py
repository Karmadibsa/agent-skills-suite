"""Tests de régression du vérificateur. Usage : python scripts/test_check_skills.py"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import check_skills as c  # noqa: E402


def test_yaml_invalide_detecte() -> None:
    # Cas réel : « Triggers: » dans une description non citée cassait le YAML de start-here.
    fm = c.frontmatter("---\nname: x\ndescription: a b. Triggers: c\n---\n")
    assert fm is not None and "__error__" in fm, fm


def test_yaml_valide_accepte() -> None:
    fm = c.frontmatter('---\nname: x\ndescription: "a b. Triggers: c"\nmetadata:\n  version: "1.0.0"\n---\n')
    assert fm == {"name": "x", "description": "a b. Triggers: c"}, fm


def test_tableau_aplati_detecte() -> None:
    text = "\n\n".join(["Colonne A", "Colonne B", "Colonne C", "val 1", "val 2", "val 3"])
    assert c.flattened_runs(text) == [1]


if __name__ == "__main__":
    if c.yaml is None:
        print("PyYAML requis : pip install pyyaml")
        sys.exit(1)
    tests = [v for k, v in dict(globals()).items() if k.startswith("test_")]
    for t in tests:
        t()
    print(f"{len(tests)} tests réussis.")
