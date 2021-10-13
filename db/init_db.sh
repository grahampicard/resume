mongo --eval "db.resume.drop()"
mongoimport --jsonArray --db resume --collection docs --file db/timeline.json
mongoimport --jsonArray --db resume --collection map --file db/map.json
mongoimport --jsonArray --db resume --collection map --file db/portfolio.json
