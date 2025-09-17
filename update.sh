#!/bin/bash

# IntelliMind Assistant - Update Script
# Similar to your SalesPulse update process

set -e  # Exit on any error

echo "================================================"
echo "🧠 IntelliMind Assistant - Update Process"
echo "================================================"
echo

# Configuration
APP_NAME="intellimind"
APP_DIR="/var/www/intellimind"

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

# Check if we're in the right directory
if [ ! -d "$APP_DIR" ]; then
    print_error "Application directory $APP_DIR not found. Please run deploy.sh first."
    exit 1
fi

cd $APP_DIR

print_status "Starting update process..."

# Step 1: Fetch latest changes from Git
print_status "Fetching latest changes from Git..."
git fetch origin
git reset --hard origin/main

# Step 2: Activate virtual environment and install dependencies
print_status "Installing/updating Python dependencies..."
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Step 3: Set proper permissions
print_status "Setting proper permissions..."
sudo chown -R www-data:www-data $APP_DIR
sudo chmod -R 755 $APP_DIR

# Step 4: Restart PM2 process
print_status "Restarting IntelliMind Assistant..."
pm2 restart $APP_NAME

# Step 5: Check if application is running
print_status "Checking application status..."
sleep 3
if pm2 list | grep -q "$APP_NAME.*online"; then
    print_success "IntelliMind Assistant is running successfully!"
else
    print_error "Application failed to start. Check logs with: pm2 logs $APP_NAME"
    exit 1
fi

# Step 6: Test health endpoint
print_status "Testing application health..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    print_success "Health check passed!"
else
    print_warning "Health check failed. Application might still be starting up."
fi

print_success "Update completed successfully!"
echo
echo "Application is running at: https://intellimind.yourdomain.com"
echo "View logs: pm2 logs $APP_NAME"
echo "Restart: pm2 restart $APP_NAME"
echo "Stop: pm2 stop $APP_NAME"
