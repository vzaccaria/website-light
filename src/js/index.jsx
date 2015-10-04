import React from 'react'
import _debug from 'debug'
import { createSidebarComponentHTML } from './sidebar'

_debug.enable('app:*');
//const debug = _debug('app:index.jsx');

// Import styles
require("style!../css/fonts.css")
require("!style!css!less!../less/main.less")


document.getElementById('sidebar').innerHTML = createSidebarComponentHTML()

// Main ideas taken from: http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/
