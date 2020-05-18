package main

import (
	"net/http"
)

func indexController(w http.ResponseWriter, r *http.Request) {
	tmpl["index"].Execute(w, nil)
}

func resumeController(w http.ResponseWriter, r *http.Request) {
	type resumeData struct {
		Timeline []timelineEvent
		Map      []mapStruct
	}

	contextData := resumeData{
		Timeline: entries,
		Map:      maps,
	}

	tmpl["resume"].Execute(w, contextData)
}

func projectsController(w http.ResponseWriter, r *http.Request) {
	tmpl["projects"].Execute(w, nil)
}

func aboutController(w http.ResponseWriter, r *http.Request) {
	tmpl["about"].Execute(w, nil)
}

var entries = getEntries()
var maps = getMap()
