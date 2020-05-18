package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/go-chi/chi"
)

func getRoutes() chi.Router {

	r := chi.NewRouter()
	r.Get("/", indexController)
	r.Get("/resume", resumeController)
	r.Get("/about", aboutController)
	r.Get("/projects", projectsController)
	addStaticFileServer(r, "/static/", "static")
	return r

}

func getEnv(key string, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func main() {
	r := getRoutes()
	r.Handle("/static/", http.StripPrefix(strings.TrimRight("/static/", "/"), http.FileServer(http.Dir("./static/"))))
	http.ListenAndServe(":"+getEnv("PORT", "8080"), r)
}
