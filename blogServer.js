// Setting up all the modules
var express = require('express')
var app = express();
var ejs = require('ejs')
app.set("view_engine", "ejs")
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
var sqlite3 = require('sqlite3').verbose();
// set database
var db = new sqlite3.Database('./db/blog.db');

// creating the tables sequentially in the js rather than have sep schema and seed files
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS bloggers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, avatar TEXT, info TEXT);");
	
	db.run("CREATE TABLE IF NOT EXISTS library (l_id INTEGER PRIMARY KEY, l_title TEXT, l_body TEXT, l_tags TEXT, l_image TEXT, b_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); CREATE TRIGGER timestamp_update BEFORE UPDATE ON posts BEGIN UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id; END;");
	
	db.run("CREATE TABLE IF NOT EXISTS comments (c_id INTEGER PRIMARY KEY, c_name TEXT, c_body TEXT, p_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); CREATE TRIGGER timestamp_update BEFORE UPDATE ON comments BEGIN UPDATE comments SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id; END;");
});


app.get('/', function(req, res){
	res.redirect('/bloggers')
});

//show all bloggers
app.get('/bloggers', function(req, res){
	db.all('SELECT * FROM bloggers', function(err,data) {
		// console.log(data);
	res.render('index.ejs', {blogger: data})
	})
});

// form for new blogger
app.get('/blogger/new', function(req, res){
	res.render('newBlogger.ejs');
});

// creating a new blogger
app.post('/bloggers', function(req, res){
	db.run("INSERT INTO bloggers (name,avatar,info) VALUES (?,?,?)", req.body.name, req.body.avatar, req.body.info, function(err) {
		if (err) throw err;
		res.redirect('/bloggers');
	})
});

// show individual blogger page
app.get('/blogger/:id', function(req, res){
	db.get("SELECT * FROM bloggers WHERE id = ?", req.params.id, function(err, data){
	res.render('show_bloggers.ejs', {blogger: data})
	})
});

// form for a new blog
app.get("/blogger/:id/blogs/new", function(req, res) {
	var b_id = parseInt(req.params.id);
	console.log(b_id);
	db.get("SELECT * FROM backpackers WHERE id ="+b_id+";", function(err, data) {
			res.render("new_blog.ejs", {backpacker: data});
	});
});

// creating a new blog
app.post('/bloggers/:id/blogs', function(req, res){
	var b_id = parseInt(req.params.id)
	db.get("SELECT * FROM bloggers WHERE id ="+b_id+";", function(err, data) {
		db.run("INSERT INTO library (l_title,l_body,l_tags,l_image) VALUES (?,?,?,?,?)", req.body.title, req.body.content, req.body.tags, req.body.image, b_id, function(err) {
			if (err) { throw err;
			}
			else{ res.redirect('/bloggers/"+b_id"/blogs');
			}
		});
	});
});

// show individual blogger posts
app.get('/blogger/:id/blogs', function(req, res){
	var b_id = parseInt(req.params.id);
	console.log(b_id);
	db.get("SELECT * FROM bloggers WHERE id ="+b_id+";", function(err,data) {
	 	db.all("SELECT * from library WHERE b_id="+b_id+";", function(err,data2){
	 		res.render('show_blogs.ejs', {bloggers: data, library: data2})
		});
	});
});



// // sending user to edit form
// app.get('/post/:id/edit', function(req, res){
// 	db.get("SELECT * FROM library WHERE id = ?", req.params.id, function(err,data){
// 	res.render("edit.ejs", {post: data});
// 	});
// });

// // to edit a post and update database
// app.put('/post/:id', function(req, res){
// 	db.run("UPDATE library SET title = ?, body = ?, tags = ?, image = ? WHERE id = ?", req.body.title, req.body.body, req.body.tags, req.body.image, parseInt(req.params.id), function(err){
// 		if(err) throw err;
// 		res.redirect('/post/' + parseInt(req.params.id));
// 	})
// });

// // serve up new page for create a post form
// app.get('/library/new', function(req, res){
// 	res.render('new.ejs');
// })



//delete a post
// app.delete('/post/:id', function(req, res){
// 	db.run("DELETE FROM posts WHERE id = ?", req.params.id, function(err){
// 		if (err) throw err;

// 	res.redirect('/posts');
// 	})
// });

app.listen(3000, function() {
	console.log("Listening on port 3000")
})








