# SMART FARMER Launcher Script
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  SMART FARMER - Smart Agriculture Management System" -ForegroundColor Yellow
Write-Host "  स्मार्ट शेतकरी - आधुनिक कृषी व्यवस्थापन प्रणाली" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Opening browser at http://localhost:3000..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "Running server on port 3000..." -ForegroundColor White
npm run start -- -p 3000
if ($LASTEXITCODE -ne 0) {
    Write-Host "Starting in development mode..." -ForegroundColor Yellow
    npm run dev -- -p 3000
}
