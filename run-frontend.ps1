Write-Host "Starting Spotix Frontend on http://localhost:5173 ..." -ForegroundColor Green
Set-Location -Path (Join-Path $PSScriptRoot "frontend")
npm run dev
