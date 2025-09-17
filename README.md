<img width="1165" height="894" alt="image" src="https://github.com/user-attachments/assets/1001221b-f2d2-4633-bc58-395756d511f8" />


## ✨ Features

- Powered by Sentient's ROMA framework and FireworksAI models
- **Context Awareness**: Maintains conversation context for better responses
- **API Integration**:Integration with FireworksAI's API endpoints
- **Easy Setup**: Automated setup script and configuration

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Run the setup script
python setup.py

# Start the application
python app.py
```

### Option 2: Windows Users
```batch
# Run the batch file (automatically handles setup)
run.bat

# Or use PowerShell
.\run.ps1
```

### Option 3: Manual Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Configure API key
cp env.example .env
# Edit .env file and add your FireworksAI API key

# Test the integration
python test_integration.py

# Run the application
python app.py
```

## 📖 Detailed Installation Guide

For comprehensive installation instructions, troubleshooting, and advanced usage, see:
**[📋 INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)**

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:
```env
FIREWORKS_API_KEY=your_fireworks_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

### Getting a FireworksAI API Key

1. Visit [FireworksAI Console](https://app.fireworks.ai/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file

## 💡 Usage

1. **Start a Conversation**: Type your message in the input field
2. **Send Messages**: Press Enter or click the send button
3. **Clear History**: Use the "Clear Conversation" button to reset
4. **Access**: Open your browser to `http://localhost:5000`

## 🧪 Testing & Demo

### Integration Test
```bash
python test_integration.py
```

### Demo Script
```bash
python demo.py
```

## 📁 Project Structure

```
IntelliMind-Assistant/
├── app.py                 # Main Flask application
├── app_demo.py           # Demo version (no API key needed)
├── requirements.txt       # Python dependencies
├── setup.py              # Automated setup script
├── test_integration.py   # Integration test script
├── demo.py               # Interactive demo script
├── run.bat               # Windows batch launcher
├── run.ps1               # Windows PowerShell launcher
├── env.example           # Environment configuration template
├── README.md             # This file
├── INSTALLATION_GUIDE.md # Detailed installation guide
├── templates/
│   └── index.html        # Main web interface
└── static/
    ├── css/
    │   └── style.css     # Styling and responsive design
    └── js/
        └── app.js        # Frontend JavaScript logic
```

## 🔍 Troubleshooting

### Common Issues

1. **API Key Not Working**: Verify your API key in the `.env` file
2. **Dependencies Not Installing**: Make sure you have Python 3.8+
3. **Application Not Starting**: Check that port 5000 is not in use

For detailed troubleshooting, see [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)

## 🤝 Contributing

Any feature recommendations/advice will be really helpful

## 📄 License

This project is open source and available under the MIT License.

---
