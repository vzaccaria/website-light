all: dev-static

start-server:
	./node_modules/.bin/webpack-dev-server --progress --colors --watch-poll 1000 --watch-aggregate-timeout 300

stop-server:
	killall webpack-dev-server

production-build:
	PROD=1 ./node_modules/.bin/webpack --progress --colors

dev-static:
	./node_modules/.bin/webpack --progress --colors

stage-build:
	STAGE=1 ./node_modules/.bin/webpack --progress --colors
	git add .
	git commit -m "new stage build"
	hub push --all

clean:
	rm -rf assets dist
