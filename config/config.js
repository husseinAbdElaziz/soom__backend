/**
 * project configuration
 */
exports.databaseUrl = process.env.DATABASE_URL;
exports.jwtAuthKey = process.env.JWT_TOKEN_KEY;
exports.jwtMailActivationKey = process.env.ACTIVATE_MAIL_KEY;
exports.smtpMailHost = process.env.MAIL_HOST;
exports.smtpMailUser = process.env.MAIL_USER;
exports.smtpMailPassword = process.env.MAIL_PWD;
exports.smtpMailPort = process.env.MAIL_PORT;
