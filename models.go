package main

type mapStruct struct {
	ID   string `bson:"id,omitempty"`
	Name string `bson:"n,omitempty"`
	Data string `bson:"d,omitempty"`
}

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
