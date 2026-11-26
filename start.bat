@echo off
rem Lance la vitrine (dossier website\) en local et ouvre le navigateur une fois le serveur pret.
rem Usage : double-cliquer sur start.bat, ou "start.bat 9000" pour changer de port.
setlocal
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8080"
set "ROOT=%~dp0website"

if not exist "%ROOT%\index.html" (
  echo Dossier website introuvable : %ROOT%
  pause
  exit /b 1
)

where py >nul 2>nul && (set "SERVER=py -3 -m http.server %PORT% --bind 127.0.0.1 --directory "%ROOT%"" & goto run)
where python >nul 2>nul && (set "SERVER=python -m http.server %PORT% --bind 127.0.0.1 --directory "%ROOT%"" & goto run)
where npx >nul 2>nul && (
  echo Python introuvable : repli sur npx serve, qui peut telecharger le paquet serve@14.2.4 au premier lancement.
  set "SERVER=npx --yes serve@14.2.4 "%ROOT%" -l tcp://127.0.0.1:%PORT%"
  goto run
)

echo Aucun serveur disponible : installez Python 3 (python.org) ou Node.js (nodejs.org).
pause
exit /b 1

:run
echo Vitrine disponible sur http://localhost:%PORT%/  (Ctrl+C pour arreter)
rem Ouvre le navigateur seulement quand le serveur repond (20 secondes maximum).
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "for ($i = 0; $i -lt 80; $i++) { try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 1 'http://127.0.0.1:%PORT%/' | Out-Null; Start-Process 'http://localhost:%PORT%/'; break } catch { Start-Sleep -Milliseconds 250 } }"
%SERVER%
