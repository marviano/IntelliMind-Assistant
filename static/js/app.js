// IntelliMind Assistant - Frontend JavaScript
class IntelliMindApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.clearButton = document.getElementById('clearButton');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.charCount = document.getElementById('charCount');
        
        this.initializeEventListeners();
        this.setWelcomeTime();
        this.updateCharacterCount();
    }
    
    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
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
                this.chatMessages.innerHTML = `
                    <div class="message assistant-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <div class="message-text">
                                Hello! I'm IntelliMind Assistant, your intelligent AI companion. I'm powered by Sentient's advanced framework and FireworksAI's cutting-edge models. How can I help you today?
                            </div>
                            <div class="message-time">${this.getCurrentTime()}</div>
                        </div>
                    </div>
                `;
                
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


