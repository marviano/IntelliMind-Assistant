# 🚀 IntelliMind Assistant - VPS Deployment Summary

## Quick Start Guide

I've created a complete deployment setup for IntelliMind Assistant on your VPS, following the same patterns as your SalesPulse application.

### Files Created:

1. **`deploy.sh`** - Initial deployment script
2. **`update.sh`** - Update script (similar to your SalesPulse process)
3. **`ecosystem.config.js`** - PM2 configuration
4. **`env.production`** - Production environment template
5. **`VPS_DEPLOYMENT_GUIDE.md`** - Comprehensive deployment guide

## Deployment Steps

### 1. Upload to VPS
```bash
# Upload the IntelliMind-Assistant folder to your VPS
scp -r IntelliMind-Assistant/ user@your-vps:/var/www/intellimind
```

### 2. Initial Setup
```bash
# On your VPS
cd /var/www/intellimind
chmod +x deploy.sh update.sh
./deploy.sh
```

### 3. Configure Environment
```bash
# Edit the environment file
nano /var/www/intellimind/.env
# Add your FireworksAI API key
```

### 4. Update Domain Configuration
```bash
# Edit deploy.sh and update.sh to use your actual domain
# Replace "intellimind.yourdomain.com" with your chosen domain
```

### 5. Set up SSL
```bash
sudo certbot --nginx -d your-intellimind-domain.com
```

## Update Process (Same as SalesPulse)

Once deployed, updating is simple:

```bash
cd /var/www/intellimind
./update.sh
```

Or manually (like your SalesPulse process):
```bash
cd /var/www/intellimind
git fetch origin
git reset --hard origin/main
source venv/bin/activate
pip install -r requirements.txt
sudo chown -R www-data:www-data /var/www/intellimind
sudo chmod -R 755 /var/www/intellimind
pm2 restart intellimind
```

## Key Features

✅ **PM2 Process Management** - Same as SalesPulse  
✅ **Nginx Reverse Proxy** - Handles SSL and static files  
✅ **Gunicorn WSGI Server** - Production-ready Python server  
✅ **Automatic Updates** - Git-based deployment  
✅ **Health Monitoring** - Built-in health checks  
✅ **Security Headers** - Production security features  
✅ **Log Management** - Centralized logging  
✅ **SSL Support** - HTTPS ready  

## Domain Setup

The deployment is configured for a separate domain (e.g., `intellimind.yourdomain.com`), so it won't interfere with your existing SalesPulse application.

## Monitoring Commands

```bash
# Check status
pm2 list

# View logs
pm2 logs intellimind

# Restart
pm2 restart intellimind

# Health check
curl https://your-intellimind-domain.com/health
```

## Next Steps

1. **Choose your domain** (e.g., `intellimind.yourdomain.com`)
2. **Upload files to VPS**
3. **Run deployment script**
4. **Configure API key**
5. **Set up DNS and SSL**
6. **Test the application**

The setup follows your existing SalesPulse patterns, so it should integrate seamlessly with your current infrastructure!

## Support

If you need help with any step, the `VPS_DEPLOYMENT_GUIDE.md` contains detailed troubleshooting and configuration instructions.
