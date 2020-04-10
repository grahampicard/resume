package main

import (
	"github.com/go-chi/chi"
)

func getRoutes() chi.Router {

	r := chi.NewRouter()
	r.Get("/", indexController)
	r.Get("/resume", resumeController)
	return r

}
