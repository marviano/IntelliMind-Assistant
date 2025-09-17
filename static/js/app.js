// IntelliMind Assistant - Frontend JavaScript
class IntelliMindApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.voiceButton = document.getElementById('voiceButton');
        this.speakButton = document.getElementById('speakButton');
        this.clearButton = document.getElementById('clearButton');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.charCount = document.getElementById('charCount');
        
        // Settings modal elements
        this.settingsModal = document.getElementById('settingsModal');
        this.settingsButton = document.getElementById('settingsButton');
        this.closeSettings = document.getElementById('closeSettings');
        
        // Voice recognition and speech synthesis
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        this.lastAssistantMessage = '';
        
        // Voice settings
        this.voiceSettings = {
            rate: 0.9,
            pitch: 1,
            volume: 0.8,
            lang: 'en-US'
        };
        
        this.initializeEventListeners();
        this.initializeVoiceFeatures();
        this.initializeSettings();
        this.setWelcomeTime();
        this.updateCharacterCount();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Voice button click
        this.voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());
        
        // Speak button click
        this.speakButton.addEventListener('click', () => this.speakLastResponse());
        
        // Settings button click
        this.settingsButton.addEventListener('click', () => this.openSettings());
        this.closeSettings.addEventListener('click', () => this.closeSettingsModal());
        
        // Send message on Enter key (but allow Shift+Enter for new lines)
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
            this.updateCharacterCount();
        });
        
        // Clear conversation
        this.clearButton.addEventListener('click', () => this.clearConversation());
        
        // Focus input on load
        this.messageInput.focus();
    }
    
    initializeVoiceFeatures() {
        // Initialize speech recognition
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
        } else if ('SpeechRecognition' in window) {
            this.recognition = new SpeechRecognition();
        } else {
            console.warn('Speech recognition not supported in this browser');
            this.voiceButton.style.display = 'none';
            return;
        }
        
        // Configure speech recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        // Speech recognition event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.voiceButton.classList.add('listening');
            this.voiceButton.innerHTML = '<i class="fas fa-stop"></i>';
            this.updateStatus('Listening...', 'typing');
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.messageInput.value = transcript;
            this.updateCharacterCount();
            this.autoResizeTextarea();
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.updateStatus('Voice recognition error', 'error');
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
            this.voiceButton.classList.remove('listening');
            this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            this.updateStatus('Ready', 'ready');
        };
        
        // Check if speech synthesis is supported
        if (!this.synthesis) {
            console.warn('Speech synthesis not supported in this browser');
            this.speakButton.style.display = 'none';
        }
    }
    
    toggleVoiceRecognition() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }
    
    speakLastResponse() {
        if (this.isSpeaking) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            this.speakButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.updateStatus('Speech stopped', 'ready');
            return;
        }
        
        if (!this.lastAssistantMessage) {
            this.updateStatus('No message to speak', 'error');
            return;
        }
        
        this.isSpeaking = true;
        this.speakButton.innerHTML = '<i class="fas fa-stop"></i>';
        this.updateStatus('Speaking...', 'typing');
        
        const utterance = new SpeechSynthesisUtterance(this.lastAssistantMessage);
        utterance.rate = this.voiceSettings.rate;
        utterance.pitch = this.voiceSettings.pitch;
        utterance.volume = this.voiceSettings.volume;
        utterance.lang = this.voiceSettings.lang;
        
        utterance.onend = () => {
            this.isSpeaking = false;
            this.speakButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.updateStatus('Ready', 'ready');
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            this.isSpeaking = false;
            this.speakButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.updateStatus('Speech error', 'error');
        };
        
        this.synthesis.speak(utterance);
    }
    
    initializeSettings() {
        // Load saved settings from localStorage
        const savedSettings = localStorage.getItem('intellimind-voice-settings');
        if (savedSettings) {
            this.voiceSettings = { ...this.voiceSettings, ...JSON.parse(savedSettings) };
        }
        
        // Set up settings controls
        const rateSlider = document.getElementById('voiceRate');
        const pitchSlider = document.getElementById('voicePitch');
        const volumeSlider = document.getElementById('voiceVolume');
        const langSelect = document.getElementById('voiceLang');
        const testButton = document.getElementById('testVoice');
        
        // Update sliders with current values
        rateSlider.value = this.voiceSettings.rate;
        pitchSlider.value = this.voiceSettings.pitch;
        volumeSlider.value = this.voiceSettings.volume;
        langSelect.value = this.voiceSettings.lang;
        
        // Update display values
        document.getElementById('rateValue').textContent = this.voiceSettings.rate;
        document.getElementById('pitchValue').textContent = this.voiceSettings.pitch;
        document.getElementById('volumeValue').textContent = this.voiceSettings.volume;
        
        // Add event listeners for settings
        rateSlider.addEventListener('input', (e) => {
            this.voiceSettings.rate = parseFloat(e.target.value);
            document.getElementById('rateValue').textContent = e.target.value;
            this.saveSettings();
        });
        
        pitchSlider.addEventListener('input', (e) => {
            this.voiceSettings.pitch = parseFloat(e.target.value);
            document.getElementById('pitchValue').textContent = e.target.value;
            this.saveSettings();
        });
        
        volumeSlider.addEventListener('input', (e) => {
            this.voiceSettings.volume = parseFloat(e.target.value);
            document.getElementById('volumeValue').textContent = e.target.value;
            this.saveSettings();
        });
        
        langSelect.addEventListener('change', (e) => {
            this.voiceSettings.lang = e.target.value;
            if (this.recognition) {
                this.recognition.lang = e.target.value;
            }
            this.saveSettings();
        });
        
        testButton.addEventListener('click', () => this.testVoiceSettings());
        
        // Close modal when clicking outside
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettingsModal();
            }
        });
    }
    
    openSettings() {
        this.settingsModal.classList.add('show');
    }
    
    closeSettingsModal() {
        this.settingsModal.classList.remove('show');
    }
    
    saveSettings() {
        localStorage.setItem('intellimind-voice-settings', JSON.stringify(this.voiceSettings));
    }
    
    testVoiceSettings() {
        const testText = "Hello! This is a test of your voice settings. How does this sound?";
        const utterance = new SpeechSynthesisUtterance(testText);
        utterance.rate = this.voiceSettings.rate;
        utterance.pitch = this.voiceSettings.pitch;
        utterance.volume = this.voiceSettings.volume;
        utterance.lang = this.voiceSettings.lang;
        
        this.synthesis.speak(utterance);
    }
    
    setWelcomeTime() {
        const welcomeTime = document.getElementById('welcomeTime');
        if (welcomeTime) {
            welcomeTime.textContent = this.getCurrentTime();
        }
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    updateCharacterCount() {
        const count = this.messageInput.value.length;
        this.charCount.textContent = count;
        
        // Change color based on character count
        if (count > 900) {
            this.charCount.style.color = '#dc3545';
        } else if (count > 700) {
            this.charCount.style.color = '#ffc107';
        } else {
            this.charCount.style.color = '#999';
        }
    }
    
    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input and reset height
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        this.updateCharacterCount();
        
        // Disable send button and show loading
        this.sendButton.disabled = true;
        this.showLoading();
        this.updateStatus('IntelliMind is thinking...', 'typing');
        
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Add assistant response to chat
                this.addMessage(data.response, 'assistant');
                this.updateStatus('Ready', 'ready');
            } else {
                throw new Error(data.error || 'Unknown error occurred');
            }
            
        } catch (error) {
            console.error('Error:', error);
            this.addMessage(`I apologize, but I encountered an error: ${error.message}. Please try again.`, 'assistant');
            this.updateStatus('Error occurred', 'error');
        } finally {
            this.hideLoading();
            this.sendButton.disabled = false;
            this.messageInput.focus();
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarIcon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(text)}</div>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        
        // Store the last assistant message for text-to-speech
        if (sender === 'assistant') {
            this.lastAssistantMessage = text;
        }
        
        this.scrollToBottom();
    }
    
    formatMessage(text) {
        // Basic formatting for better readability
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    async clearConversation() {
        if (!confirm('Are you sure you want to clear the conversation? This action cannot be undone.')) {
            return;
        }
        
        try {
            const response = await fetch('/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                // Clear the chat messages (keep only the welcome message)
                const welcomeMessage = "Hello! I'm IntelliMind Assistant, your intelligent AI companion. I'm powered by Sentient's advanced framework and FireworksAI's cutting-edge models. How can I help you today?";
                
                this.chatMessages.innerHTML = `
                    <div class="message assistant-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-text">
                                ${welcomeMessage}
                            </div>
                            <div class="message-time">${this.getCurrentTime()}</div>
                        </div>
                    </div>
                `;
                
                // Update the last assistant message for text-to-speech
                this.lastAssistantMessage = welcomeMessage;
                
                this.updateStatus('Conversation cleared', 'ready');
                setTimeout(() => this.updateStatus('Ready', 'ready'), 2000);
            } else {
                throw new Error(data.error || 'Failed to clear conversation');
            }
            
        } catch (error) {
            console.error('Error clearing conversation:', error);
            alert('Failed to clear conversation. Please try again.');
        }
    }
    
    updateStatus(text, type) {
        const statusText = this.statusIndicator.querySelector('.status-text');
        const statusDot = this.statusIndicator.querySelector('.status-dot');
        
        statusText.textContent = text;
        this.statusIndicator.className = `status-indicator ${type}`;
        
        // Auto-hide status after 3 seconds for non-error states
        if (type !== 'error') {
            setTimeout(() => {
                if (this.statusIndicator.className.includes(type)) {
                    this.updateStatus('Ready', 'ready');
                }
            }, 3000);
        }
    }
    
    showLoading() {
        this.loadingOverlay.classList.add('show');
    }
    
    hideLoading() {
        this.loadingOverlay.classList.remove('show');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IntelliMindApp();
});

// Add some utility functions for better UX
document.addEventListener('keydown', (e) => {
    // Allow Ctrl/Cmd + K to focus the input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('messageInput').focus();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, refresh status
        const statusIndicator = document.getElementById('statusIndicator');
        if (statusIndicator && statusIndicator.className.includes('ready')) {
            statusIndicator.querySelector('.status-text').textContent = 'Ready';
        }
    }
});


