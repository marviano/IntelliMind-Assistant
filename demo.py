#!/usr/bin/env python3
"""
IntelliMind Assistant Demo Script
This script demonstrates how to use the IntelliMind Assistant programmatically.
"""

import os
import sys
from dotenv import load_dotenv

# Add the current directory to Python path
sys.path.insert(0, '.')

def demo_conversation():
    """Demonstrate a conversation with IntelliMind Assistant"""
    print("=" * 60)
    print("🧠 IntelliMind Assistant - Demo Conversation")
    print("=" * 60)
    print()
    
    # Load environment variables
    load_dotenv()
    
    # Check if API key is configured
    api_key = os.getenv('FIREWORKS_API_KEY')
    if not api_key or api_key == 'your_fireworks_api_key_here':
        print("❌ FireworksAI API key not configured")
        print("   Please set FIREWORKS_API_KEY in your .env file")
        print("   Get your API key from: https://app.fireworks.ai/")
        return False
    
    try:
        # Import the assistant
        from app import IntelliMindAssistant
        
        # Create assistant instance
        print("🤖 Initializing IntelliMind Assistant...")
        assistant = IntelliMindAssistant()
        print("✅ Assistant initialized successfully!")
        print()
        
        # Demo conversation
        demo_messages = [
            "Hello! Can you tell me about yourself?",
            "What makes you different from other AI assistants?",
            "Can you help me understand how Sentient's framework works?",
            "What are some interesting things I can do with FireworksAI?"
        ]
        
        print("💬 Starting demo conversation...")
        print()
        
        for i, message in enumerate(demo_messages, 1):
            print(f"👤 User: {message}")
            print()
            
            # Get response from assistant
            response = assistant.process_message(message)
            print(f"🤖 IntelliMind: {response}")
            print()
            print("-" * 60)
            print()
        
        print("🎉 Demo conversation completed!")
        return True
        
    except Exception as e:
        print(f"❌ Error during demo: {e}")
        return False

def demo_features():
    """Demonstrate key features of IntelliMind Assistant"""
    print("=" * 60)
    print("🌟 IntelliMind Assistant - Feature Demo")
    print("=" * 60)
    print()
    
    features = [
        {
            "name": "Context Awareness",
            "description": "Maintains conversation context for better responses",
            "example": "Ask follow-up questions and see how I remember previous context"
        },
        {
            "name": "Sentient Integration",
            "description": "Powered by Sentient's advanced AI framework",
            "example": "Experience intelligent responses using Sentient's models"
        },
        {
            "name": "FireworksAI API",
            "description": "Leverages FireworksAI's powerful model endpoints",
            "example": "Fast, reliable responses from FireworksAI's infrastructure"
        },
        {
            "name": "Modern Web Interface",
            "description": "Clean, responsive design with real-time chat",
            "example": "Beautiful UI that works on desktop and mobile devices"
        }
    ]
    
    for i, feature in enumerate(features, 1):
        print(f"{i}. {feature['name']}")
        print(f"   {feature['description']}")
        print(f"   💡 {feature['example']}")
        print()
    
    print("🚀 To experience these features:")
    print("   1. Run: python app.py")
    print("   2. Open: http://localhost:5000")
    print("   3. Start chatting with IntelliMind!")
    print()

def main():
    """Main demo function"""
    print("🧠 IntelliMind Assistant Demo")
    print("Choose a demo option:")
    print("1. Run conversation demo (requires API key)")
    print("2. Show feature overview")
    print("3. Exit")
    print()
    
    while True:
        try:
            choice = input("Enter your choice (1-3): ").strip()
            
            if choice == '1':
                demo_conversation()
                break
            elif choice == '2':
                demo_features()
                break
            elif choice == '3':
                print("👋 Goodbye!")
                break
            else:
                print("❌ Invalid choice. Please enter 1, 2, or 3.")
                print()
                
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")
            break

if __name__ == "__main__":
    main()


