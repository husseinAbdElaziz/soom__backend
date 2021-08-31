import { connect } from 'mongoose';
import { config } from './config';

/**
 * @description connect to mongoDB
 */
export const dbConnect = async () => {
  try {
    await connect(config?.databaseUrl!, {
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
