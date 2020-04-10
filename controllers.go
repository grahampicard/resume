package main

import (
	"net/http"
)

func indexController(w http.ResponseWriter, r *http.Request) {
	tmpl["index"].Execute(w, nil)
}

func resumeController(w http.ResponseWriter, r *http.Request) {
	tmpl["resume"].Execute(w, nil)
}
