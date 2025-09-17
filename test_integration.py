#!/usr/bin/env python3
"""
IntelliMind Assistant Test Script
This script tests the integration with FireworksAI API.
"""

import os
import sys
from dotenv import load_dotenv
from fireworks import LLM

def test_fireworks_connection():
    """Test connection to FireworksAI API"""
    print("🧪 Testing FireworksAI API connection...")
    
    # Load environment variables
    load_dotenv()
    
    api_key = os.getenv('FIREWORKS_API_KEY')
    if not api_key or api_key == 'your_fireworks_api_key_here':
        print("❌ FireworksAI API key not configured")
        print("   Please set FIREWORKS_API_KEY in your .env file")
        return False
    
    try:
        # Initialize LLM
        llm = LLM(
            model="llama-v3p1-8b-instruct",
            api_key=api_key
        )
        
        # Test with a simple message
        print("📤 Sending test message...")
        response = llm.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are IntelliMind Assistant, a helpful AI assistant."
                },
                {
                    "role": "user",
                    "content": "Hello! This is a test message from IntelliMind Assistant setup."
                }
            ],
            max_tokens=100,
            temperature=0.7
        )
        
        assistant_response = response.choices[0].message.content
        print("📥 Received response:")
        print(f"   {assistant_response}")
        print()
        print("✅ FireworksAI API connection successful!")
        return True
        
    except Exception as e:
        print(f"❌ Error connecting to FireworksAI API: {e}")
        return False

def test_app_imports():
    """Test if the main app can be imported"""
    print("🧪 Testing application imports...")
    
    try:
        # Test if we can import the main app
        sys.path.insert(0, '.')
        from app import IntelliMindAssistant
        
        # Test if we can create an instance (this will fail if API key is not set)
        try:
            assistant = IntelliMindAssistant()
            print("✅ Application imports successful!")
            return True
        except ValueError as e:
            if "FIREWORKS_API_KEY" in str(e):
                print("⚠️  Application imports successful, but API key not configured")
                return True
            else:
                raise e
                
    except Exception as e:
        print(f"❌ Error importing application: {e}")
        return False

def main():
    print("=" * 60)
    print("🧠 IntelliMind Assistant - Integration Test")
    print("=" * 60)
    print()
    
    # Test imports
    imports_ok = test_app_imports()
    print()
    
    # Test API connection
    api_ok = test_fireworks_connection()
    print()
    
    # Summary
    print("=" * 60)
    if imports_ok and api_ok:
        print("🎉 All tests passed! IntelliMind Assistant is ready to use.")
        print()
        print("To start the application:")
        print("  python app.py")
    elif imports_ok:
        print("⚠️  Application setup is correct, but API connection failed.")
        print("   Please check your FireworksAI API key configuration.")
    else:
        print("❌ Some tests failed. Please check the error messages above.")
    print("=" * 60)

if __name__ == "__main__":
    main()


