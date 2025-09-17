#!/usr/bin/env python3
"""
IntelliMind Assistant - Simple Test Version
This is a simplified version to test the basic functionality.
"""

import os
import sys

def test_basic_setup():
    """Test basic setup without external dependencies"""
    print("=" * 60)
    print("🧠 IntelliMind Assistant - Basic Setup Test")
    print("=" * 60)
    print()
    
    # Check Python version
    print(f"✅ Python version: {sys.version.split()[0]}")
    
    # Check if Flask is available
    try:
        import flask
        print(f"✅ Flask version: {flask.__version__}")
    except ImportError:
        print("❌ Flask not installed")
    
    # Check if dotenv is available
    try:
        import dotenv
        print("✅ python-dotenv is available")
    except ImportError:
        print("❌ python-dotenv not installed")
    
    # Check API key
    api_key = "fw_3ZUr3QCT6vDv2bb1cwxThFVx"
    print(f"✅ FireworksAI API key: {api_key[:10]}...{api_key[-4:]}")
    
    print()
    print("=" * 60)
    print("🎉 Basic setup test completed!")
    print()
    print("Next steps:")
    print("1. Install FireworksAI: pip install fireworks-ai")
    print("2. Run the application: python app.py")
    print("3. Open browser to: http://localhost:5000")
    print("=" * 60)

if __name__ == "__main__":
    test_basic_setup()