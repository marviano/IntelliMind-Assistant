# IntelliMind Assistant - PowerShell Launcher
# This script helps launch the IntelliMind Assistant on Windows

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🧠 IntelliMind Assistant" -ForegroundColor Yellow
Write-Host "🔗 Powered by Sentient's Framework & FireworksAI" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
    } else {
        throw "Python not found"
    }
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8 or higher from https://python.org" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Environment file not found" -ForegroundColor Yellow
    Write-Host "Creating .env from template..." -ForegroundColor Yellow
    
    if (Test-Path "env.example") {
        Copy-Item "env.example" ".env"
        Write-Host "✅ Environment file created" -ForegroundColor Green
    } else {
        Write-Host "❌ Environment template not found" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    
    Write-Host ""
    Write-Host "⚠️  Please edit .env file and add your FireworksAI API key" -ForegroundColor Yellow
    Write-Host "Get your API key from: https://app.fireworks.ai/" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Environment file found" -ForegroundColor Green
Write-Host ""

# Create virtual environment if it doesn't exist
if (-not (Test-Path "venv")) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Blue
    python -m venv venv
}

# Activate virtual environment
Write-Host "📦 Activating virtual environment..." -ForegroundColor Blue
& ".\venv\Scripts\Activate.ps1"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
pip install -r requirements.txt

Write-Host ""
Write-Host "🚀 Starting IntelliMind Assistant..." -ForegroundColor Green
Write-Host "🌐 Open your browser and go to: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

# Start the application
python app.py


