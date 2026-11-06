@echo off
title SMART FARMER - Smart Agriculture Management System
echo ============================================================
echo   SMART FARMER - Smart Agriculture Management System
echo   स्मार्ट शेतकरी - आधुनिक कृषी व्यवस्थापन प्रणाली
echo ============================================================
echo.
echo Starting SMART FARMER on http://localhost:3000 ...
echo.

cd /d "%~dp0"

start http://localhost:3000

call npm run start -- -p 3000
if %errorlevel% neq 0 (
    echo.
    echo Production build not found or starting in development mode...
    call npm run dev -- -p 3000
)

pause
