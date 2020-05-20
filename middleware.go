package main

import (
	"context"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Delcarations for local vars updated in init()
var databaseURL = "mongodb://localhost:27017"
var ok bool
var entries []timelineEvent
var maps []mapStruct

func init() {

	databaseURL, ok = os.LookupEnv("MONGODB_URI")
	if !ok {
		// e.g.: YourUserName:YourPassword@YourHost:5432/YourDatabase
		panic("You must supply the DATABASE_URL")
	}

	entries = getEntries()
	maps = getMap()
}

func getMap() []mapStruct {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(databaseURL))

	// Defers prevent data leaks
	defer cancel()
	defer client.Disconnect(ctx)
	if err != nil {
		panic(err)
	}

	// Get most recent timeline data
	timelineCollection := client.Database("test").Collection("map")
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
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	// Defers prevent data leaks
	defer cancel()
	defer client.Disconnect(ctx)
	if err != nil {
		panic(err)
	}

	// Get most recent timeline data
	timelineCollection := client.Database("test").Collection("docs")
	cursor, err := timelineCollection.Find(ctx, bson.M{})

	if err != nil {
		panic(err)
	}

	var entries []timelineEvent
	if err = cursor.All(ctx, &entries); err != nil {
		panic(err)
	}

	return entries
}
