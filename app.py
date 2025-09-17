import os
import json
from flask import Flask, render_template, request, jsonify
from fireworks import LLM
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

class IntelliMindAssistant:
    """IntelliMind Assistant - A smart AI assistant using Sentient models and FireworksAI"""
    
    def __init__(self):
        self.api_key = os.getenv('FIREWORKS_API_KEY')
        if not self.api_key:
            raise ValueError("FIREWORKS_API_KEY environment variable is required")
        
        # Initialize FireworksAI LLM with Sentient-compatible model
        self.llm = LLM(
            model="llama-v3p1-8b-instruct",  # Using a model compatible with Sentient framework
            api_key=self.api_key,
            deployment_type="auto"  # Required parameter for FireworksAI
        )
        
        # Conversation context for maintaining state
        self.conversation_history = []
        
    def process_message(self, user_message):
        """Process user message using Sentient-inspired logic and FireworksAI"""
        try:
            # Add user message to conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            
            # Prepare messages for the API (including conversation context)
            messages = [
                {
                    "role": "system", 
                    "content": "You are IntelliMind Assistant, an advanced AI assistant powered by Sentient's framework and FireworksAI. You provide helpful, intelligent, and context-aware responses. Maintain conversation context and be conversational yet informative."
                }
            ]
            
            # Add conversation history (limit to last 10 messages to avoid token limits)
            messages.extend(self.conversation_history[-10:])
            
            # Generate response using FireworksAI
            response = self.llm.chat.completions.create(
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            assistant_response = response.choices[0].message.content
            
            # Add assistant response to conversation history
            self.conversation_history.append({"role": "assistant", "content": assistant_response})
            
            return assistant_response
            
        except Exception as e:
            return f"I apologize, but I encountered an error: {str(e)}. Please try again."
    
    def clear_conversation(self):
        """Clear conversation history"""
        self.conversation_history = []
        return "Conversation history cleared."

# Initialize the assistant
assistant = IntelliMindAssistant()

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

@app.route('/updates')
def updates():
    """Update log page"""
    return render_template('updates.html')

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'app': 'IntelliMind Assistant'})

if __name__ == '__main__':
    print("🧠 IntelliMind Assistant Starting...")
    print("🔗 Powered by Sentient's framework and FireworksAI")
    print("🌐 Access the web interface at: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
