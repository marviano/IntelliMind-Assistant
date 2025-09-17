@echo off
echo ================================================
echo 🧠 IntelliMind Assistant - Windows Setup
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

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

echo 📦 Activating virtual environment...
call venv\Scripts\activate.bat

echo 📦 Installing dependencies...
pip install --upgrade pip
pip install Flask python-dotenv fireworks-ai requests gunicorn Werkzeug

echo.
echo 🔧 Setting up environment file...
if not exist .env (
    if exist env.example (
        copy env.example .env
        echo ✅ Environment file created from template
        echo ⚠️  Please edit .env file and add your FireworksAI API key
    ) else (
        echo FIREWORKS_API_KEY=your_fireworks_api_key_here > .env
        echo FLASK_ENV=development >> .env
        echo FLASK_DEBUG=True >> .env
        echo HOST=0.0.0.0 >> .env
        echo PORT=5000 >> .env
        echo ✅ Environment file created
    )
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo To start the IntelliMind Assistant:
echo   python app_demo.py    (Demo version - no API key needed)
echo   python app.py         (Full version - requires API key)
echo.
echo Then open your browser and go to:
echo   http://localhost:5000
echo.
pause
