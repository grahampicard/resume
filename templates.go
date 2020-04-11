package main

import "html/template"

var tmpl = make(map[string]*template.Template)

func init() {
	m := template.Must
	p := template.ParseFiles

	// Pages
	tmpl["index"] = m(p("views/index.gohtml", "views/layout.gohtml"))
	tmpl["resume"] = m(p("views/resume.gohtml", "views/layout.gohtml"))
	tmpl["about"] = m(p("views/about.gohtml", "views/layout.gohtml"))
	tmpl["projects"] = m(p("views/projects.gohtml", "views/layout.gohtml"))

}
