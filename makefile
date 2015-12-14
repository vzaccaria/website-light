start-server:
	./node_modules/.bin/webpack-dev-server --progress --colors

production-build:
	PROD=1 ./node_modules/.bin/webpack --progress --colors
