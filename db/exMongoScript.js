// This script is interpreted by the `mongo` shell. 
// In the mongo shell, there are some pre-declared variable, such as
// `db`. We can use this to manipulate our databases.

print('\n')
print('Connected!\n')

// let's find the # of docs in our `docs` collection
docCount = db.docs.count()
print("There are " + docCount + " doc records")

// // now, let's show the first 20 docs
// myDocs = db.docs.find().toArray()
// printjson(myDocs)

// let's find the # of states in our map collection
mapCount = db.map.count()
print("There are " + mapCount + " map records")
