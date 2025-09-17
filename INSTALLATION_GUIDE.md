# IntelliMind Assistant - Complete Installation & Usage Guide

A sophisticated AI assistant application that leverages Sentient's advanced models and FireworksAI's API endpoints to provide intelligent conversational capabilities.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Deployment](#deployment)

## 🔧 Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS, or Linux
- **Python**: Version 3.8 or higher
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 500MB free space
- **Internet**: Required for FireworksAI API access

### Required Accounts
- **FireworksAI Account**: [Sign up here](https://app.fireworks.ai/)
- **GitHub Account** (optional): For code backup and collaboration

## 🚀 Installation

### Method 1: Quick Setup (Recommended)

1. **Download the Project**
   ```bash
   git clone https://github.com/YOUR_USERNAME/IntelliMind-Assistant.git
   cd IntelliMind-Assistant
   ```

2. **Run Automated Setup**
   ```bash
   python setup.py
   ```

3. **Start the Application**
   ```bash
   python app.py
   ```

### Method 2: Manual Installation

1. **Install Python Dependencies**
   ```bash
   pip install Flask python-dotenv fireworks-ai requests gunicorn Werkzeug
   ```

2. **Create Environment File**
   ```bash
   # Copy the template
   cp env.example .env
   
   # Edit .env file and add your API key
   nano .env  # or use any text editor
   ```

3. **Test Installation**
   ```bash
   python test_integration.py
   ```

4. **Start Application**
   ```bash
   python app.py
   ```

### Method 3: Windows Users

1. **Double-click** `run.bat` file
2. **Follow the prompts** in the command window
3. **Application will start automatically**

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Required: FireworksAI API Key
FIREWORKS_API_KEY=your_fireworks_api_key_here

# Optional: Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Optional: Server Configuration
HOST=0.0.0.0
PORT=5000
```

### Getting FireworksAI API Key

1. **Visit**: [FireworksAI Console](https://app.fireworks.ai/)
2. **Sign up** or log in to your account
3. **Navigate** to API Keys section
4. **Create** a new API key
5. **Copy** the key and add it to your `.env` file

### API Key Format
Your API key should look like: `fw_3ZUr3QCT6vDv2bb1cwxThFVx`

## 💻 Usage

### Starting the Application

1. **Open Terminal/Command Prompt**
2. **Navigate to project directory**
   ```bash
   cd IntelliMind-Assistant
   ```
3. **Start the application**
   ```bash
   python app.py
   ```
4. **Open browser** and go to: `http://localhost:5000`

### Using the Interface

1. **Type your message** in the input field
2. **Press Enter** or click the send button
3. **Wait for response** from IntelliMind
4. **Continue the conversation** naturally
5. **Clear history** using the clear button when needed

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Ctrl/Cmd + K**: Focus input field

### Example Conversations

**Getting Started:**
- "Hello, how are you?"
- "What can you help me with?"
- "Tell me about Sentient's framework"

**Technical Questions:**
- "How does FireworksAI work?"
- "What models do you use?"
- "Explain the architecture of this app"

**General Chat:**
- "What do you think about [topic]?"
- "Help me understand [concept]"
- "Can you explain [question]?"

## 🔍 Troubleshooting

### Common Issues

#### 1. Python Not Found
**Error**: `python: command not found`

**Solution**:
- Install Python from [python.org](https://python.org)
- Make sure to check "Add Python to PATH" during installation
- Restart your terminal after installation

#### 2. API Key Not Working
**Error**: `FIREWORKS_API_KEY environment variable is required`

**Solutions**:
- Verify your API key is correct in `.env` file
- Check that you have credits in your FireworksAI account
- Ensure the API key has necessary permissions

#### 3. Port Already in Use
**Error**: `Address already in use`

**Solutions**:
- Change the port in `.env` file: `PORT=5001`
- Kill the process using port 5000
- Restart your computer

#### 4. Dependencies Not Installing
**Error**: `ModuleNotFoundError`

**Solutions**:
- Update pip: `pip install --upgrade pip`
- Use virtual environment: `python -m venv venv`
- Install dependencies individually

#### 5. Connection Refused
**Error**: `ERR_CONNECTION_REFUSED`

**Solutions**:
- Make sure the app is running (`python app.py`)
- Check firewall settings
- Try `http://127.0.0.1:5000` instead of `localhost:5000`

### Debug Mode

Enable debug mode for detailed error information:

```bash
# Set environment variable
export FLASK_DEBUG=True

# Or edit .env file
FLASK_DEBUG=True
```

### Logs and Monitoring

Check application logs in the terminal where you started the app. Look for:
- ✅ Success messages
- ❌ Error messages
- 🔄 Request/response logs

## 🛠️ Development

### Project Structure

```
IntelliMind-Assistant/
├── app.py                 # Main Flask application
├── app_demo.py           # Demo version (no API key needed)
├── requirements.txt      # Python dependencies
├── setup.py              # Automated setup script
├── test_integration.py   # Integration test script
├── demo.py               # Interactive demo script
├── run.bat               # Windows batch launcher
├── run.ps1               # Windows PowerShell launcher
├── env.example           # Environment configuration template
├── README.md             # This file
├── templates/
│   └── index.html        # Main web interface
└── static/
    ├── css/
    │   └── style.css     # Styling and responsive design
    └── js/
        └── app.js        # Frontend JavaScript logic
```

### Customization

#### Changing the Model
Edit `app.py` line 22:
```python
self.llm = LLM(
    model="your-preferred-model",  # Change this
    api_key=self.api_key,
    deployment_type="auto"
)
```

#### Modifying the Interface
- **CSS**: Edit `static/css/style.css`
- **HTML**: Edit `templates/index.html`
- **JavaScript**: Edit `static/js/app.js`

#### Adding Features
- **New API endpoints**: Add routes in `app.py`
- **New UI components**: Modify HTML/CSS/JS files
- **New AI capabilities**: Extend the `IntelliMindAssistant` class

### Testing

Run the test suite:
```bash
python test_integration.py
python demo.py
```

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment

#### Using Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Using Docker
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

#### Cloud Deployment
- **Heroku**: Use Procfile with gunicorn
- **AWS**: Use Elastic Beanstalk or EC2
- **Google Cloud**: Use App Engine or Cloud Run
- **DigitalOcean**: Use App Platform

### Environment Variables for Production

```env
FLASK_ENV=production
FLASK_DEBUG=False
FIREWORKS_API_KEY=your_production_api_key
HOST=0.0.0.0
PORT=5000
```

## 📚 Additional Resources

### Documentation
- [Flask Documentation](https://flask.palletsprojects.com/)
- [FireworksAI Documentation](https://docs.fireworks.ai/)
- [Sentient Framework](https://github.com/sentient-agi)

### Support
- **GitHub Issues**: Report bugs and request features
- **Discord Community**: Join the Sentient community
- **FireworksAI Support**: Contact their support team

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Sentient's Framework and FireworksAI**

*Last updated: January 2025*


