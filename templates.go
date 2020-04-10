package main

import (
	"html/template"
)

var tmpl = make(map[string]*template.Template)

func init() {
	m := template.Must
	p := template.ParseFiles
	tmpl["index"] = m(p("views/index.gohtml", "views/layout.gohtml"))
	tmpl["resume"] = m(p("views/resume.gohtml", "views/layout.gohtml"))
}
