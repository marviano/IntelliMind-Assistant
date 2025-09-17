# IntelliMind Assistant - VPS Deployment Guide

This guide will help you deploy IntelliMind Assistant on your VPS alongside your existing SalesPulse application.

## Prerequisites

- VPS with Ubuntu/Debian (similar to your SalesPulse setup)
- Python 3.8+ installed
- PM2 installed and configured
- Nginx installed and configured
- Git installed
- Domain name for IntelliMind (e.g., intellimind.yourdomain.com)

## Step-by-Step Deployment

### 1. Upload Files to VPS

First, upload the IntelliMind Assistant files to your VPS. You can either:

**Option A: Clone from Git (Recommended)**
```bash
# On your VPS
cd /var/www
git clone https://github.com/yourusername/IntelliMind-Assistant.git intellimind
cd intellimind
```

**Option B: Upload via SCP/SFTP**
```bash
# From your local machine
scp -r IntelliMind-Assistant/ user@your-vps:/var/www/intellimind
```

### 2. Run Initial Deployment

```bash
cd /var/www/intellimind
chmod +x deploy.sh
./deploy.sh
```

**Important:** During deployment, you'll need to:
1. Edit `/var/www/intellimind/.env` and add your FireworksAI API key
2. Update the domain name in the script (replace `intellimind.yourdomain.com` with your actual domain)

### 3. Configure Domain and SSL

**DNS Configuration:**
- Add an A record pointing your IntelliMind domain to your VPS IP
- Example: `intellimind.yourdomain.com` → `your-vps-ip`

**SSL Certificate (using Certbot):**
```bash
sudo certbot --nginx -d intellimind.yourdomain.com
```

### 4. Test the Application

```bash
# Check if the application is running
pm2 list

# View logs
pm2 logs intellimind

# Test locally
curl http://localhost:5000/health

# Test via domain (after DNS propagation)
curl https://intellimind.yourdomain.com/health
```

## Update Process (Similar to SalesPulse)

Once deployed, you can update IntelliMind using the same pattern as SalesPulse:

```bash
cd /var/www/intellimind
chmod +x update.sh
./update.sh
```

This script will:
1. Fetch latest changes from Git
2. Install/update dependencies
3. Set proper permissions
4. Restart the PM2 process
5. Verify the application is running

## Manual Update Commands

If you prefer manual updates (like your SalesPulse process):

```bash
cd /var/www/intellimind

# Fetch and reset to latest
git fetch origin
git reset --hard origin/main

# Update dependencies
source venv/bin/activate
pip install -r requirements.txt

# Set permissions
sudo chown -R www-data:www-data /var/www/intellimind
sudo chmod -R 755 /var/www/intellimind

# Restart PM2
pm2 restart intellimind
```

## Configuration Files

### PM2 Configuration (`ecosystem.config.js`)
- Manages the IntelliMind process
- Configures logging and restart policies
- Uses Gunicorn as WSGI server

### Nginx Configuration
- Handles SSL termination
- Serves static files
- Proxies requests to the Flask application
- Includes security headers

### Environment Configuration (`.env`)
- Contains API keys and settings
- Separate from your SalesPulse configuration
- Located at `/var/www/intellimind/.env`

## Monitoring and Maintenance

### View Logs
```bash
# Application logs
pm2 logs intellimind

# Nginx logs
sudo tail -f /var/log/nginx/intellimind_access.log
sudo tail -f /var/log/nginx/intellimind_error.log

# System logs
sudo journalctl -u nginx -f
```

### Restart Services
```bash
# Restart IntelliMind
pm2 restart intellimind

# Restart Nginx
sudo systemctl restart nginx

# Restart PM2
pm2 restart all
```

### Check Status
```bash
# PM2 status
pm2 status

# Nginx status
sudo systemctl status nginx

# Application health
curl https://intellimind.yourdomain.com/health
```

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   pm2 logs intellimind
   # Check for missing dependencies or API key issues
   ```

2. **Nginx 502 Bad Gateway**
   ```bash
   # Check if IntelliMind is running
   pm2 list
   # Check Nginx configuration
   sudo nginx -t
   ```

3. **SSL Certificate Issues**
   ```bash
   # Renew certificates
   sudo certbot renew
   # Test SSL
   curl -I https://intellimind.yourdomain.com
   ```

4. **Permission Issues**
   ```bash
   sudo chown -R www-data:www-data /var/www/intellimind
   sudo chmod -R 755 /var/www/intellimind
   ```

## Security Considerations

1. **Firewall**: Ensure only necessary ports are open
2. **API Keys**: Keep FireworksAI API key secure
3. **Updates**: Regularly update dependencies
4. **Monitoring**: Set up log monitoring and alerts
5. **Backups**: Regular backups of configuration files

## Performance Optimization

1. **Gunicorn Workers**: Adjust based on your VPS resources
2. **Nginx Caching**: Static files are cached for 1 year
3. **Gzip Compression**: Enabled for better performance
4. **PM2 Clustering**: Can be enabled for multiple instances

## Integration with Existing Setup

This deployment is designed to work alongside your SalesPulse application:

- **Separate Domains**: Each app has its own domain
- **Independent Processes**: Separate PM2 processes
- **Isolated Configuration**: Separate environment files
- **Shared Infrastructure**: Uses same VPS, Nginx, and PM2

## Next Steps

1. Deploy using the provided scripts
2. Configure your domain and SSL
3. Test the application thoroughly
4. Set up monitoring and alerts
5. Create regular backup procedures

## Support

If you encounter issues:
1. Check the logs first
2. Verify all configuration files
3. Test each component individually
4. Check network connectivity and DNS

The deployment follows the same patterns as your SalesPulse setup, so it should integrate seamlessly with your existing infrastructure.
