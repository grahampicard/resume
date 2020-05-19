package main

import (
	"encoding/json"
	"net/http"
)

func apiTimeline(w http.ResponseWriter, r *http.Request) {

	// entries = getEntries()
	jsonData, err := json.MarshalIndent(entries, "", "  ")

	if err != nil {
		http.Error(w, "could not parse to json", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}

func apiMap(w http.ResponseWriter, r *http.Request) {

	// maps = getMap()
	jsonData, err := json.MarshalIndent(maps, "", "  ")

	if err != nil {
		http.Error(w, "could not parse to json", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
