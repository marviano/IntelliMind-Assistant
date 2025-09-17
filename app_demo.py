#!/usr/bin/env python3
"""
IntelliMind Assistant - Demo Version (No .env file needed)
This version works without FireworksAI to demonstrate the interface.
"""

import os
import sys
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

class IntelliMindDemo:
    """IntelliMind Assistant Demo - Works without FireworksAI"""
    
    def __init__(self):
        self.conversation_history = []
        
    def process_message(self, user_message):
        """Process user message with demo responses"""
        try:
            # Add user message to conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            
            # Generate demo response based on keywords
            response = self.generate_demo_response(user_message)
            
            # Add assistant response to conversation history
            self.conversation_history.append({"role": "assistant", "content": response})
            
            return response
            
        except Exception as e:
            return f"I apologize, but I encountered an error: {str(e)}. Please try again."
    
    def generate_demo_response(self, message):
        """Generate demo responses based on message content"""
        message_lower = message.lower()
        
        if "hello" in message_lower or "hi" in message_lower:
            return "Hello! I'm IntelliMind Assistant, your intelligent AI companion. I'm designed to work with Sentient's framework and FireworksAI's models. This is a demo version - to get full functionality, please install FireworksAI!"
        
        elif "sentient" in message_lower:
            return "Sentient's framework provides advanced AI capabilities for building intelligent agents. IntelliMind Assistant is designed to showcase these capabilities when integrated with FireworksAI's API endpoints."
        
        elif "fireworks" in message_lower:
            return "FireworksAI provides powerful API endpoints for AI models. To use the full IntelliMind Assistant, you'll need to install the fireworks-ai package and configure your API key."
        
        elif "framework" in message_lower:
            return "This app uses Flask (Python web framework) for the backend and vanilla HTML/CSS/JavaScript for the frontend. It's similar to Next.js but uses Python instead of Node.js. The AI integration uses FireworksAI's API endpoints."
        
        elif "next.js" in message_lower or "nextjs" in message_lower:
            return "Great question! This app uses Flask (Python) instead of Next.js (Node.js). Flask is Python's equivalent to Next.js - it's a web framework for building web applications. Both are great choices, but this project uses Python to integrate with Sentient's AI framework."
        
        elif "help" in message_lower:
            return "I can help you understand how IntelliMind Assistant works! Try asking about Sentient's framework, FireworksAI, or just have a conversation with me. This demo shows the interface - install FireworksAI for full AI capabilities!"
        
        elif "test" in message_lower:
            return "Great! This demo is working perfectly. The interface is ready, and once you install FireworksAI, you'll have access to real AI conversations powered by Sentient's models."
        
        else:
            return f"I understand you said: '{message}'. This is a demo version of IntelliMind Assistant. To get full AI capabilities, please install FireworksAI and configure your API key. The interface is working perfectly!"
    
    def clear_conversation(self):
        """Clear conversation history"""
        self.conversation_history = []
        return "Conversation history cleared."

# Initialize the demo assistant
assistant = IntelliMindDemo()

@app.route('/')
def index():
    """Main page"""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message.strip():
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Process the message
        response = assistant.process_message(user_message)
        
        return jsonify({
            'response': response,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear', methods=['POST'])
def clear_chat():
    """Clear conversation history"""
    try:
        assistant.clear_conversation()
        return jsonify({'status': 'success', 'message': 'Conversation cleared'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'app': 'IntelliMind Assistant Demo'})

if __name__ == '__main__':
    print("🧠 IntelliMind Assistant Demo Starting...")
    print("🔗 This is a demo version - install FireworksAI for full AI capabilities")
    print("🌐 Access the web interface at: http://localhost:5000")
    print("📝 Try asking: 'Hello', 'What is Sentient?', 'Tell me about FireworksAI'")
    print("💡 Framework: Flask (Python) - similar to Next.js but for Python!")
    app.run(debug=True, host='0.0.0.0', port=5000)