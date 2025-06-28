@echo off
echo.
echo ========================================
echo   🔥 PROJECT BOLT - STARTUP SCRIPT 🔥
echo ========================================
echo.

echo Starting Project Bolt services...
echo.

echo [1/3] Starting Frontend (React)...
start "Project Bolt Frontend" cmd /k "npm run dev"

echo [2/3] Starting Python Backend...
start "Project Bolt Python Backend" cmd /k "cd backend\python && python main.py"

echo [3/3] Starting Go Backend...
start "Project Bolt Go Backend" cmd /k "cd backend\go && go run main.go"

echo.
echo ========================================
echo   🚀 ALL SERVICES STARTED! 🚀
echo ========================================
echo.
echo Frontend:    http://localhost:5173
echo Python API:  http://localhost:8000
echo Go API:      http://localhost:8080
echo.
echo Press any key to exit...
pause > nul 