
server:
	~/go/bin/reflex -d fancy -r'\.go' -r'\.gohtml' -s -R vendor. -- go run .

test:
	go test -cover