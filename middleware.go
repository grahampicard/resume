package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Delcarations for local vars updated in init()
var databaseURL = "mongodb://localhost:27017"
var ok bool
var db *mongo.Database

var entries []timelineEvent
var maps []mapStruct

func init() {

	databaseURL, ok = os.LookupEnv("MONGODB_URI")
	if !ok {
		// e.g.: YourUserName:YourPassword@YourHost:5432/YourDatabase
		panic("You must supply the DATABASE_URL")
	}

	clientOptions := options.Client().ApplyURI(databaseURL)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	db = client.Database("resume")
	entries = getEntries()
	maps = getMap()
}

func getMap() []mapStruct {

	// Get most recent timeline data
	timelineCollection := db.Collection("map")
	cursor, err := timelineCollection.Find(context.TODO(), bson.M{})

	if err != nil {
		panic(err)
	}

	var mapStates []mapStruct
	if err = cursor.All(context.TODO(), &mapStates); err != nil {
		panic(err)
	}

	return mapStates
}

func getEntries() []timelineEvent {

	// Get most recent timeline data
	timelineCollection := db.Collection("docs")
	cursor, err := timelineCollection.Find(context.TODO(), bson.M{})

	if err != nil {
		panic(err)
	}

	var entries []timelineEvent
	if err = cursor.All(context.TODO(), &entries); err != nil {
		panic(err)
	}

	return entries
}
