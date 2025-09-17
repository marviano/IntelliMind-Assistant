#!/usr/bin/env python3
"""
IntelliMind Assistant Setup Script
This script helps you set up the IntelliMind Assistant application.
"""

import os
import sys
import subprocess
import shutil

def print_banner():
    print("=" * 60)
    print("🧠 IntelliMind Assistant Setup")
    print("🔗 Powered by Sentient's Framework & FireworksAI")
    print("=" * 60)
    print()

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Error: Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        return False
    print(f"✅ Python version: {sys.version.split()[0]}")
    return True

def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def setup_environment():
    """Set up environment configuration"""
    print("🔧 Setting up environment configuration...")
    
    env_file = ".env"
    env_example = "env.example"
    
    if os.path.exists(env_file):
        print("✅ Environment file already exists")
        return True
    
    if os.path.exists(env_example):
        shutil.copy(env_example, env_file)
        print("✅ Environment file created from template")
        print("⚠️  Please edit .env file and add your FireworksAI API key")
        return True
    else:
        print("❌ Environment template not found")
        return False

def check_api_key():
    """Check if API key is configured"""
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv('FIREWORKS_API_KEY')
    if api_key and api_key != 'your_fireworks_api_key_here':
        print("✅ FireworksAI API key is configured")
        return True
    else:
        print("⚠️  FireworksAI API key not configured")
        print("   Please edit .env file and add your API key")
        return False

def main():
    print_banner()
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Setup environment
    if not setup_environment():
        sys.exit(1)
    
    # Check API key
    api_configured = check_api_key()
    
    print()
    print("=" * 60)
    if api_configured:
        print("🎉 Setup completed successfully!")
        print()
        print("To start the IntelliMind Assistant:")
        print("  python app.py")
        print()
        print("Then open your browser and go to:")
        print("  http://localhost:5000")
    else:
        print("⚠️  Setup completed with warnings!")
        print()
        print("Next steps:")
        print("1. Edit .env file and add your FireworksAI API key")
        print("2. Get your API key from: https://app.fireworks.ai/")
        print("3. Run: python app.py")
    print("=" * 60)

if __name__ == "__main__":
    main()


