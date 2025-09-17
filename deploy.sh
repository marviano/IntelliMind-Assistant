#!/bin/bash

# IntelliMind Assistant - Production Deployment Script
# This script deploys IntelliMind Assistant to your VPS

set -e  # Exit on any error

echo "================================================"
echo "🧠 IntelliMind Assistant - Production Deployment"
echo "================================================"
echo

# Configuration
APP_NAME="intellimind"
APP_DIR="/var/www/intellimind"
DOMAIN="217.217.252.95"  # Using VPS IP address for now
PYTHON_VERSION="3.11"  # Adjust based on your VPS Python version

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Note: This script can be run as root for VPS deployment

# Check if we're in the right directory
if [ ! -f "app.py" ]; then
    print_error "Please run this script from the IntelliMind Assistant root directory"
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Create application directory (if needed)
print_status "Ensuring application directory exists..."
mkdir -p $APP_DIR

# Step 2: We're already in the right directory
print_status "Application files already in place..."
# cd $APP_DIR  # We're already here

# Step 3: Set up Python virtual environment
print_status "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Step 4: Install dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn  # Add gunicorn for production

# Step 5: Create production environment file
print_status "Creating production environment configuration..."
cat > .env << EOF
# IntelliMind Assistant - Production Configuration
FIREWORKS_API_KEY=your_fireworks_api_key_here
FLASK_ENV=production
FLASK_DEBUG=False
HOST=0.0.0.0
PORT=5000
EOF

print_warning "Please edit $APP_DIR/.env and add your FireworksAI API key!"

# Step 6: Set proper permissions
print_status "Setting proper permissions..."
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Step 7: Create PM2 ecosystem file
print_status "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'venv/bin/gunicorn',
    args: '--bind 0.0.0.0:5000 --workers 4 --timeout 120 --access-logfile - --error-logfile - app:app',
    cwd: '$APP_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      FLASK_ENV: 'production'
    },
    error_file: '/var/log/pm2/$APP_NAME-error.log',
    out_file: '/var/log/pm2/$APP_NAME-out.log',
    log_file: '/var/log/pm2/$APP_NAME-combined.log',
    time: true
  }]
};
EOF

# Step 8: Create Nginx configuration
print_status "Creating Nginx configuration..."
tee /etc/nginx/sites-available/$APP_NAME << EOF
server {
    listen 80;
    server_name $DOMAIN;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Static files
    location /static/ {
        alias $APP_DIR/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Main application
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://127.0.0.1:5000/health;
        access_log off;
    }
}
EOF

# Step 9: Enable Nginx site
print_status "Enabling Nginx site..."
ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Step 10: Start application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save

print_success "Deployment completed successfully!"
echo
echo "Next steps:"
echo "1. Edit $APP_DIR/.env and add your FireworksAI API key"
echo "2. Set up SSL certificates for $DOMAIN"
echo "3. Update your DNS to point $DOMAIN to this server"
echo "4. Test the application: https://$DOMAIN"
echo
echo "Useful commands:"
echo "- View logs: pm2 logs $APP_NAME"
echo "- Restart app: pm2 restart $APP_NAME"
echo "- Stop app: pm2 stop $APP_NAME"
echo "- Update app: ./update.sh"
echo
print_success "IntelliMind Assistant is now deployed!"
