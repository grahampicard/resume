mongo --eval "db.resume.drop()"
mongoimport --jsonArray --db resume --collection docs --file timeline.json
mongoimport --jsonArray --db resume --collection map --file map.json
mongoimport --jsonArray --db resume --collection map --file portfolio.json