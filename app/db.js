import dotenv from 'dotenv';
import mongoose from 'Mongoose';
import bluebird from 'bluebird';

class DB {
  static connect() {
    dotenv.config({path:'.env'});

    mongoose.Promise = bluebird;
    const DB = `${process.env.DATABASE}.mlab.com:${process.env.DATABASENAME}`;
    const database = mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${DB}`);
  }
}

export default DB;
