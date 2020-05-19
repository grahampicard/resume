package main

import (
	"net/http"

	"github.com/go-chi/chi"
)

func projectpageController(w http.ResponseWriter, r *http.Request) {

	projectID := chi.URLParam(r, "id")

	type Project struct {
		ID string
	}

	projectData := Project{ID: projectID}

	// if err != nil {
	// 	http.Error(w, "bad eventID", http.StatusBadRequest)
	// 	return
	// }

	tmpl["projectPage"].Execute(w, projectData)

}
