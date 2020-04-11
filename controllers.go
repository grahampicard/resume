package main

import "net/http"

func indexController(w http.ResponseWriter, r *http.Request) {
	tmpl["index"].Execute(w, nil)
}

func resumeController(w http.ResponseWriter, r *http.Request) {
	tmpl["resume"].Execute(w, events)
}

func projectsController(w http.ResponseWriter, r *http.Request) {
	tmpl["projects"].Execute(w, nil)
}

func aboutController(w http.ResponseWriter, r *http.Request) {
	tmpl["about"].Execute(w, nil)
}
