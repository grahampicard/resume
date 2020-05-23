package main

import (
	"net/http"
	"os"
	"path/filepath"
)

func getEnv(key string, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func main() {
	r := getRoutes()

	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "static"))
	FileServer(r, "/static", filesDir)

	http.ListenAndServe(":"+getEnv("PORT", "8080"), r)
}
