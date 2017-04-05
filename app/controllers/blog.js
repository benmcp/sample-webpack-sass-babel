import DB from '../db';
import Post from '../models/post';
import mongoose from 'Mongoose';

class Blog {
  constructor() {
    DB.connect();
  }

  fetchPosts(res) {
    Post()
      .find({}, (err, data) => {
        if (err)  { return err; }
      })
      .then((data) => {
        mongoose.connection.close();
        res.send(JSON.stringify(data));
      });
  }
}

export default Blog;
