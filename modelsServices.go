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

func init() {

	databaseURL, ok = os.LookupEnv("MONGODB_URI")
	if !ok {
		panic("You must supply the MONGODB_URI")
	}

	clientOptions := options.Client().ApplyURI(databaseURL)
	client, err := mongo.Connect(context.TODO(), clientOptions)

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	db = client.Database("resume")

}

func getMap() []mapStruct {
	// Query MAP collection
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

func getEntries() []timelineEventStruct {
	// Query TIMELINE collection
	timelineCollection := db.Collection("docs")
	cursor, err := timelineCollection.Find(context.TODO(), bson.M{})

	if err != nil {
		panic(err)
	}

	var entries []timelineEventStruct
	if err = cursor.All(context.TODO(), &entries); err != nil {
		panic(err)
	}

	return entries
}

func getPortfolio() []portfolioStruct {
	// Query PORTFOLIO collection
	timelineCollection := db.Collection("portfolio")
	cursor, err := timelineCollection.Find(context.TODO(), bson.M{})

	if err != nil {
		panic(err)
	}

	var portfolio []portfolioStruct
	if err = cursor.All(context.TODO(), &portfolio); err != nil {
		panic(err)
	}

	return portfolio
}

func getPortfolioItem(id string) portfolioStruct {
	// Query PORTFOLIO collection
	var result portfolioStruct

	timelineCollection := db.Collection("portfolio")
	err := timelineCollection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if err != nil {
		panic(err)
	}

	return result
}
