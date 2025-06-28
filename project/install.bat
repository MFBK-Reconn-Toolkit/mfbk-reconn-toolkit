@echo off
echo.
echo ========================================
echo   🔥 PROJECT BOLT - INSTALLATION 🔥
echo ========================================
echo.

echo Installing Project Bolt dependencies...
echo.

echo [1/4] Installing Frontend Dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)

echo [2/4] Setting up Python Backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Python backend installation failed!
    pause
    exit /b 1
)
cd ..

echo [3/4] Setting up Go Backend...
cd backend\go
go mod tidy
if %errorlevel% neq 0 (
    echo ❌ Go backend setup failed!
    pause
    exit /b 1
)
cd ..\..

echo [4/4] Installing Required Tools...
echo Installing ProjectDiscovery tools...
go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest

echo.
echo ========================================
echo   ✅ INSTALLATION COMPLETED! ✅
echo ========================================
echo.
echo Next steps:
echo 1. Run 'start.bat' to start all services
echo 2. Open http://localhost:5173 in your browser
echo 3. Enjoy Project Bolt! 🔥
echo.
pause 