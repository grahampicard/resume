mongo --eval "db.docs.drop()"
mongoimport --jsonArray --db test --collection docs --file timeline.json