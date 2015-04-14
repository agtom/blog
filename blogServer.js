// Setting up all the modules

// App to use express server
var express = require('express')
var app = express();

var ejs = require('ejs')
app.set("view_engine", "ejs")

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

var methodOverride = require('method-override')
app.use(methodOverride('_method'))


// App to be backed up by a Sqlite3 database
var sqlite3 = require('sqlite3').verbose();
// note the path the db is relative
var db = new sqlite3.Database('./db/movies.db');

app.get('/', function(req, res){
	res.redirect('/posts')
});

//show all posts
app.get('/posts', function(req, res){
	db.all('SELECT * FROM posts', function(err,data) {
	})
	res.render('index.ejs', {pets: data})
});

//show individual post
app.get('/post/:id', function(req, res){
	//get post id from url, set post to appropriate post
	db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data){
	res.render('show.ejs', {post: data})
	})
});

//serve up new page for create a post form
app.get('/posts/new', function(req, res){
	res.render('new.ejs');
})

//create a post
app.post('/posts', function(req, res){
	console.log(req.body)
	db.run("INSERT INTO posts (title,body,tags,IMAGE) VALUES (?,?,?,?)", req.body.type, function(err) {
		if (err) throw err;
		res.redirect('/posts')
	})
});

//sending user to edit form
db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err,data){
	res.render("edit.ejs", {post: post});
	});
});

//update a post
app.put('/post/:id', function(req, res){
	db.run("UPDATE posts SET title = ?, body = ?, tags = ?, IMAGE = ? WHERE id = ?", req.body.title, req.body.body, req.body.tags, req.body.IMAGE, req.params.id, function(err){
		if(err) throw err;
		res.redirect('/post' + parseInt(req.params.id));
	})
});

//delete a post
app.delete('/post/:id', function(req, res){
	db.run("DELETE FROM posts WHERE id = ?", req.params.id, function(err){
		if (err) throw err;

	res.redirect('/posts');
	})
});

app.listen(3000, function() {
	console.log("Listening on port 3000")
})








