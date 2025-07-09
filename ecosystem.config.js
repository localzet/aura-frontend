module.exports = {
    apps: [
        {
            name: 'aura-frontend',
            script: 'dist/main.js',
            watch: false,
            instances: 1,
            merge_logs: true,
            exec_mode: 'cluster',
            instance_var: 'INSTANCE_ID',
            env_development: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            namespace: 'frontend'
        }
    ]
}
