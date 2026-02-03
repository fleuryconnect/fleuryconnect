@echo off
title Viewer OBJ - Serveur local

echo ===============================
echo   Lancement du viewer 3D
echo ===============================
echo.

REM Vérifie si Python est installé
python --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo ❌ Python n'est pas installé
    echo 👉 Installe Python depuis https://www.python.org
    pause
    exit
)

echo ✅ Python detecte
echo.

REM Lance le serveur
echo 🚀 Lancement du serveur local...
python -m http.server 8000

start "" http://localhost:8000/3D.html

pause
