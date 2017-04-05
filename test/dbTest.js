import dotenv from 'dotenv';
import Blog from '../app/controllers/blog';

class DbTest {
  constructor() {
    dotenv.config({path:'../.env'});
    const getBlog = new Blog();
    console.log(getBlog);
  }
}

const test = new DbTest();

process.exit()
