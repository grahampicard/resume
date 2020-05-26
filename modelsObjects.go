package main

type mapStruct struct {
	ID   string `bson:"id,omitempty"`
	Name string `bson:"n,omitempty"`
	Data string `bson:"d,omitempty"`
}

type timelineEventStruct struct {
	// ID        primitive.ObjectID `bson:"_id,omitempty"`
	ID        int      `bson:"id,omitempty"`
	Category  string   `bson:"category,omitempty"`
	Beginning string   `bson:"beginning,omitempty"`
	Ending    string   `bson:"ending,omitempty"`
	Entry     string   `bson:"entry,omitempty"`
	Details   []string `bson:"details,omitempty"`
	State     []string `bson:"state,omitempty"`
	Location  string   `bson:"display_location,omitempty"`
}

type whereStruct struct {
	Text string
	Link string
}

type portfolioStruct struct {
	ID       string        `bson:"id,omitempty"`
	Name     string        `bson:"name,omitempty"`
	Category string        `bson:"category,omitempty"`
	Why      string        `bson:"why,omitempty"`
	How      string        `bson:"how,omitempty"`
	What     []string      `bson:"what,omitempty"`
	Where    []whereStruct `bson:"where,omitempty"`
	Img      string        `bson:"img,omitempty"`
	Caption  string        `bson:"caption,omitempty"`
}
