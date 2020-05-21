mongo --eval "db.docs.drop()"
mongoimport --jsonArray --db resume --collection docs --file timeline.json

mongo --eval "db.map.drop()"
mongoimport --jsonArray --db resume --collection map --file map.json