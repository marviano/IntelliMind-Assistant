@echo off
echo ================================================
echo 🧠 IntelliMind Assistant
echo 🔗 Powered by Sentient's Framework & FireworksAI
echo ================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://python.org
    echo.
    pause
    exit /b 1
)

echo ✅ Python found
echo.

REM Check if .env file exists
if not exist .env (
    echo ⚠️  Environment file not found
    echo Creating .env from template...
    copy env.example .env
    echo.
    echo ⚠️  Please edit .env file and add your FireworksAI API key
    echo Get your API key from: https://app.fireworks.ai/
    echo.
    pause
    exit /b 1
)

echo ✅ Environment file found
echo.

REM Install dependencies if needed
if not exist venv (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

echo 📦 Activating virtual environment...
call venv\Scripts\activate.bat

echo 📦 Installing dependencies...
pip install -r requirements.txt

echo.
echo 🚀 Starting IntelliMind Assistant...
echo 🌐 Open your browser and go to: http://localhost:5000
echo.

REM Start the application
python app.py

pause


