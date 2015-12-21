start-server:
	./node_modules/.bin/webpack-dev-server --progress --colors

stop-server:
	killall webpack-dev-server

production-build:
	PROD=1 ./node_modules/.bin/webpack --progress --colors

stage-build:
	STAGE=1 ./node_modules/.bin/webpack --progress --colors
