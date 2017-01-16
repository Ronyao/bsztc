module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "bsztc1.0",
      script    : "server.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "root",
      host : "123.207.32.145",
      ref  : "origin/master",
      repo : "git@github.com:Ronyao/bsztc1.0.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
