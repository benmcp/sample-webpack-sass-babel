import mongoose from 'Mongoose';

function Post() {
  const Schema = mongoose.Schema;
  const postSchema = new Schema({
    title:  String,
    path: String,
    url:   String,
    dateCreated: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    hidden: Boolean,
  });

  let posts;
  try {
    posts = mongoose.model('Post');
  } catch (error) {
    posts = mongoose.model('Post', postSchema);
  }
  finally {
    return posts;
  }
}

export default Post;
