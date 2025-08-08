module.exports = {
  apps: [
    {
      name: 'carbie-frontend',
      script: 'start-prod.js',
      cwd: '/home/bart/CodeProjects/carbiefrontend',
      env: {
        NODE_ENV: 'production'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    }
  ]
};
