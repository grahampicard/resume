package main

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type timelineEvent struct {
	// ID        primitive.ObjectID `bson:"_id,omitempty"`
	ID        int      `bson:"id,omitempty"`
	Category  string   `bson:"category,omitempty"`
	Beginning string   `bson:"beginning,omitempty"`
	Ending    string   `bson:"ending,omitempty"`
	Entry     string   `bson:"entry,omitempty"`
	Details   []string `bson:"details,omitempty"`
	State     []string `bson:"state,omitempty"`
}

func getEntries() []timelineEvent {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MONGODB_URI))

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
