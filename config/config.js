/**
 * project configuration
 */

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  jwtAuthKey: process.env.JWT_TOKEN_KEY,
  jwtMailActivationKey: process.env.ACTIVATE_MAIL_KEY,
  siteUrl: process.env.SITE_URL,
  smtpMailHost: process.env.MAIL_HOST,
  smtpMailUser: process.env.MAIL_USER,
  smtpMailPassword: process.env.MAIL_PWD,
  smtpMailPort: process.env.MAIL_PORT,
};
