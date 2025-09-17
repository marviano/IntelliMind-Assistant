module.exports = {
  apps: [{
    name: 'intellimind',
    script: 'venv/bin/gunicorn',
    args: '--bind 0.0.0.0:5000 --workers 4 --timeout 120 --access-logfile - --error-logfile - app:app',
    cwd: '/var/www/intellimind',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      FLASK_ENV: 'production'
    },
    error_file: '/var/log/pm2/intellimind-error.log',
    out_file: '/var/log/pm2/intellimind-out.log',
    log_file: '/var/log/pm2/intellimind-combined.log',
    time: true,
    // Restart policy
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    // Process management
    kill_timeout: 5000,
    listen_timeout: 3000,
    // Health monitoring
    health_check_grace_period: 3000,
    health_check_interval: 30000
  }]
};
