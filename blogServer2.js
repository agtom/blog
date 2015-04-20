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
var blogid = 3; 


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
	res.render('new_blogger.ejs');
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

			res.render('show_blogger.ejs', {blogger: data})
	})
});


// form for a new blog
app.get("/blogger/:id/blogs/new", function(req, res) {
	var bloggerid = parseInt(req.params.id);
	console.log(bloggerid);
	db.get("SELECT * FROM bloggers WHERE id = ?", bloggerid, function(err, data) {
		console.log(data);
			res.render("new_blog.ejs", {blogger: data});
	});
});


// creating a new blog
app.post('/blogger/:id/blogs', function(req, res){
	var bloggerid = parseInt(req.params.id);
	blogid++; 
	db.get("SELECT * FROM bloggers WHERE id =?", bloggerid, function(err, data) {
		// console.log(data);
		db.run("INSERT INTO library (l_title,l_body,l_tags,l_image, bloggerid, blogid) VALUES (?,?,?,?,?,?)", req.body.title, req.body.content, req.body.tags, req.body.image, bloggerid, blogid, function(err) {
			if (err) { 
				throw(err);
			}
			else{ res.redirect('/blogger/'+bloggerid+'/blogs');
			}
		});
	});
});


// show individual blogger's posts
app.get('/blogger/:id/blogs', function(req, res){
	// var bloggerid = parseInt(req.params.id);
	// console.log(bloggerid);
	db.get("SELECT * FROM bloggers WHERE id =?", parseInt(req.params.id), function(err,data) {
		// console.log(data);
	 	db.all("SELECT * from library WHERE bloggerid=?", parseInt(req.params.id), function(err,data2){
	 		// console.log(data2);
		 		res.render('show_blogs.ejs', {blogger: data, library: data2});
		});
	});
});


// form to edit blogger
app.get('/blogger/:id/edit', function(req, res){
	db.get("SELECT * FROM bloggers WHERE id = ?", req.params.id, function(err,data){
	res.render("edit_blogger.ejs", {blogger: data});
	});
});


// editing blogger
app.put('/blogger/:id', function(req, res){
	db.run("UPDATE bloggers SET name = ?, avatar = ?, info = ? WHERE id = ?", req.body.name, req.body.avatar, req.body.info, parseInt(req.params.id), function(err){
		if(err) throw err;
		res.redirect('/blogger/' + parseInt(req.params.id));
	})
});


// form to edit a post
app.get('/blogger/:id/blog/:blogid/edit', function(req, res){

	db.get("SELECT * FROM bloggers WHERE id = ?", req.params.id, function(err,data){
		db.all("SELECT * from library WHERE blogid=?", req.params.blogid, function(err,data2){
	 		console.log(data2);
		res.render("edit_blog.ejs", {blogger: data, library: data2});
		});
	});
});

// editing blog
app.put('/blogger/:id/blog/:blogid', function(req, res){
	db.run("UPDATE library SET l_title = ?, l_body = ?, l_tags = ?, l_image = ? WHERE blogid = ?", req.body.title, req.body.content, req.body.tags, req.body.image, parseInt(req.params.blogid), function(err){
		if(err) throw err;
		res.redirect('/blogger/' + parseInt(req.params.id) + '/blogs');
	})
});





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








