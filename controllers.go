package main

import (
	"net/http"

	"github.com/go-chi/chi"
)

func aboutController(w http.ResponseWriter, r *http.Request) {
	tmpl["about"].Execute(w, nil)
}

func indexController(w http.ResponseWriter, r *http.Request) {
	tmpl["index"].Execute(w, nil)
}

func projectsController(w http.ResponseWriter, r *http.Request) {
	type portfolioControllerStruct struct {
		Portfolio []portfolioStruct
	}

	items := getPortfolio()
	portfolio := portfolioControllerStruct{
		Portfolio: items,
	}

	tmpl["projects"].Execute(w, portfolio)
}

func projectPageController(w http.ResponseWriter, r *http.Request) {
	projectID := chi.URLParam(r, "id")
	projectData := getPortfolioItem(projectID)

	tmpl["projectPage"].Execute(w, projectData)

}

func resumeController(w http.ResponseWriter, r *http.Request) {
	type resumeControllerStruct struct {
		Timeline []timelineEventStruct
		Map      []mapStruct
	}

	entries := getEntries()
	maps := getMap()

	resumeData := resumeControllerStruct{
		Timeline: entries,
		Map:      maps,
	}

	tmpl["resume"].Execute(w, resumeData)
}
