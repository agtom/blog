var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('blog.db');
db.run("INSERT INTO posts (title, body, tags, image) VALUES (?, ?, ?, ?)",
	'My first blog', 'This is blog content', 'Blogging',	'image',
  function(err) {
    if (err) {
      throw err;
    }
  }
);