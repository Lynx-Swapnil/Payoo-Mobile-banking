@echo off
echo ========================================
echo   Starting Payoo MFS Application
echo ========================================
echo.
echo Backend will run on: http://localhost:3000
echo Frontend will run on: http://localhost:8000
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

REM Start backend in a new window
start "Payoo Backend" cmd /k "cd server && npm start"

REM Wait 2 seconds for backend to start
timeout /t 2 /nobreak > nul

REM Start frontend in a new window
start "Payoo Frontend" cmd /k "python -m http.server 8000"

REM Open browser after 3 seconds
timeout /t 3 /nobreak > nul
start http://localhost:8000

echo.
echo Both servers are starting...
echo Close this window or press Ctrl+C to exit
echo.
pause
