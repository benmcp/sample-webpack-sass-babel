import Blog from './controllers/blog';
const path = require('path');

function init(app, middleware) {

  app.get('/api/posts', (req, res) => {
    let posts = new Blog();
    posts.fetchPosts(res);
  });

  app.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send("User-agent: *\nDisallow:");
  });

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });

}
module.exports.init = init;
