# Payoo MFS Application Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Payoo MFS Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will run on: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Green
Write-Host "Frontend will run on: " -NoNewline
Write-Host "http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start backend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm start"

# Wait for backend to start
Start-Sleep -Seconds 2

# Start frontend in new terminal  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; python -m http.server 8000"

# Wait and open browser
Start-Sleep -Seconds 3
Start-Process "http://localhost:8000"

Write-Host ""
Write-Host "✓ Both servers are starting in separate windows..." -ForegroundColor Green
Write-Host "✓ Browser will open automatically..." -ForegroundColor Green
Write-Host ""
Write-Host "You can close this window now." -ForegroundColor Yellow
