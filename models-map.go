package main

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mapStruct struct {
	ID   string `bson:"id,omitempty"`
	Name string `bson:"n,omitempty"`
	Data string `bson:"d,omitempty"`
}

func getMap() []mapStruct {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MONGODB_URI))

	// Defers prevent data leaks
	defer cancel()
	defer client.Disconnect(ctx)
	if err != nil {
		panic(err)
	}

	// Get most recent timeline data
	timelineCollection := client.Database("test").Collection("map")
	cursor, err := timelineCollection.Find(ctx, bson.M{})

	if err != nil {
		panic(err)
	}

	var mapStates []mapStruct
	if err = cursor.All(ctx, &mapStates); err != nil {
		panic(err)
	}

	return mapStates
}
