import dotenv from 'dotenv';
import GitHubApi from 'github';
import DB from '../app/db';
import Post from '../app/models/post';

class UpdateDb {

  constructor() {
    // import global variable
    dotenv.config({path:'../.env'})

    // setup local variables
    this.count = 0;
    this.file = 'posts.json';
    this.githubPosts = [];
    this.repo = 'TIL';
    this.user = 'benmcphail';
    this.path = '';
    this.single = true;


    // Connect to Mongod db
    DB.connect();
    this.Post = Post();

    this.setupGithub();
    this.getAllGithubPosts();
  }

  setupGithub() {
    this.github = new GitHubApi({
      // optional args
      debug: false
    });

    // oauth key/secret (to get a token)
    this.github.authenticate({
        type: 'oauth',
        key: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    });
  }

  getAllGithubPosts(path = this.path) {
    this.github.repos.getContent({
        user: this.user,
        repo: this.repo,
        path: path,
    }, (err, res) => {

      if(err) {
        console.log(err)
        return false;
      }
      this.githubPosts = res;

      let requests = res.map((elem) => {
        if (elem.type === 'dir') {
          this.getAllGithubPosts(elem.path);
        } else if (elem.type === 'file') {
          return this.getSingleGithubPost(elem);
        }
      });
    });
  }

  getSingleGithubPost(elem = false) {
    if (!elem) { return false; };

    this.github.repos.getContent({
        user: this.user,
        repo: this.repo,
        path: elem.path,
    }, (err, res) => {
      if(err) {
        return false;
      }

      let title = false;
      const content = new Buffer(res['content'], 'base64').toString();
      const array = content.match(/[^\r\n]+/g);

      array.every((line) => {
        if (line.indexOf('# ', 'base64') !== -1) {
          title = line.split('# ')[1];
          return false;
        } else {
          return true;
        }
      });

      if (!title) {
        return false;
      } else {
        if (this.single) {
          const post = new this.Post({
            title: title,
            path: elem.path,
            url: elem._links.self,
            dateCreated: res.meta['last-modified'],
          });
          post.save((err, fluffy) => {
            if (err) return console.error(err);
            console.log('saved');
          });
          this.single = false;
        }
        return true;
      }
    });
  }
}

const test = new UpdateDb();
