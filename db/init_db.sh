mongo --eval "db.docs.drop()"
mongoimport --jsonArray --db test --collection docs --file timeline.json

mongo --eval "db.map.drop()"
mongoimport --jsonArray --db test --collection map --file map.json