INSERT INTO bloggers (name, avatar, info) 
VALUES 
('Andy',	
 'http://www.mangaj.com/uploads/cartoons/original/1428395227DssZDoHh.jpg',
 'English coder in NYC'),

  ('Alex', 
  'http://wikipics.net/photos/20150206142322639625248.jpg',
  'English rose in LDN'),

  ('Hugh', 
  'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT86PoO0hJiK9HX_uQ75kw0T7WoorT7ukBEmTCWxG87AwcpoZBZGw',
  'English dude in LDN');

  INSERT INTO library (l_title, l_body, l_tags, l_image, bloggerid, blogid, l_vote) 
VALUES 
('NYC',	
 'A day in the life of a coder in NYC is so brilliant',
 'NYC',
 'http://nycparkingauthority.com/wp-content/uploads/2013/05/nyc-parking-tickets2.jpg',
 '1',
 '1',
 '1'
 ),

  ('LDN', 
  'A day in London is fantastic',
  'LDN',
  'http://cdn.londonandpartners.com/visit/london-organisations/houses-of-parliament/63950-640x360-london-icons2-640.jpg',
  '2',
  '2',
  '1'
  ),

  ('Hugh', 
  'A day in South London is grimy',
  'SLDN',
  'http://translationservices24.files.wordpress.com/2012/09/brixton.jpg',
  '3',
  '3',
  '1'
);

  INSERT INTO comments (c_name, c_body, c_image, b_id, l_id, c_vote) 
VALUES 
('Andy',	
 'Great blog',
 'http://www.mangaj.com/uploads/cartoons/original/1428395227DssZDoHh.jpg',
'1',
'1',
'1'
),

('Alex',	
 'Awesome blog',
 'http://wikipics.net/photos/20150206142322639625248.jpg',
'2',
'2',
'1'
),

('Hugh',	
 'Super blog',
 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT86PoO0hJiK9HX_uQ75kw0T7WoorT7ukBEmTCWxG87AwcpoZBZGw',
'3',
'3',
'1'
);