package main

import (
	"github.com/go-chi/chi"
)

func getRoutes() chi.Router {
	r := chi.NewRouter()
	r.Get("/", indexController)
	r.Get("/resume", resumeController)
	r.Get("/about", aboutController)
	r.Get("/projects", projectsController)
	r.Get("/projects/{id:[a-z]+}", projectPageController)

	return r
}
