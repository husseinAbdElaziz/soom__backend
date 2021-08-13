const { connect } = require('mongoose');
const { databaseUrl } = require('./config');

/**
 * @description connect to mongoDB
 */
module.exports = async () => {
  try {
    await connect(databaseUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('connected');
  } catch (err) {
    console.log(err);
  }
};
