
DROP TABLE IF EXISTS bloggers;
CREATE TABLE bloggers (
	id INTEGER PRIMARY KEY AUTOINCREMENT, 
	name TEXT, 
	avatar TEXT, 
	info TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	); 

DROP TABLE IF EXISTS library;
CREATE TABLE library (
	id INTEGER PRIMARY KEY, 
	l_title TEXT, 
	l_body TEXT, 
	l_tags TEXT, 
	l_image TEXT,
	bloggerid INT,
	blogid INT,
	commentid INT,
	l_vote INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	); 

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	id INTEGER PRIMARY KEY, 
	c_name TEXT, 
	c_body TEXT, 
	c_image TEXT,
	b_id INT,
	l_id INT,
	c_vote INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	); 

-- CREATE TRIGGER timestamp_update BEFORE UPDATE ON comments BEGIN UPDATE comments SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id; END;
