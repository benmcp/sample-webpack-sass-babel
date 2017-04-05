import fs from 'fs';
import dotenv from 'dotenv';
import GitHubApi from 'github';
import blubird from 'bluebird';

class GetData {

  constructor() {

    dotenv.config({path:'../.env'})
    this.setupGithub();

    this.file = 'posts.json';
    this.posts = [];
    this.repo = 'TIL';
    this.user = 'benmcphail';
    this.path = '';


    fs.writeFile(this.file, '[', (err) => {
      if(err) {
        return console.log(err);
      }

      this.getContents();

      fs.appendFile(this.file, ']', () => {
        console.log(this.file + ' updated');
      });

    });
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

  getContents(path = this.path) {
    this.github.repos.getContent({
        user: this.user,
        repo: this.repo,
        path: path,
    }, (err, res) => {

      if(err) {
        return console.log(err);
      }

      res.forEach((elem) => {
        if (elem.type === 'dir') {
          this.getContents(elem.path);
        } else if (elem.type === 'file') {
          this.getFileContents(elem);
        }
      });
    });
  }

  getFileContents(elem = false) {
    if (!elem) { return false; };

    this.github.repos.getContent({
        user: this.user,
        repo: this.repo,
        path: elem.path,
    }, (err, res) => {
      if(err) {
        return console.log(err);
      }

      const content = new Buffer(res['content'], 'base64').toString();

      let title = false;
      const array = content.match(/[^\r\n]+/g);

      array.every((line) => {
        if (line.indexOf('# ', 'base64') !== -1) {
          title = line.split('# ')[1];
          return false;
        } else {
          return true;
        }
      });

      if (title) {
        const obj = {
          title: title,
          path: elem.path,
          url: elem._links.self,
          latest: res.meta['last-modified']
        };
        this.posts.push(obj);

        fs.writeFile(this.file, JSON.stringify(this.posts) , 'utf-8');
      }
    });
  }
}

const test = new GetData();
