import React from 'react';
import { createSidebarComponentHTML } from './sidebar';
import { Routes } from './routes';
import Router from 'react-router'

// Debug..
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:index.jsx');


// Main ideas taken from: http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/


// Import styles
require("style!../css/fonts.css");
require("!style!css!less!../less/main.less");
require("!style!css!less!highlight.js/styles/solarized_light.css");

// Render sidebar
document.getElementById('sidebar').innerHTML = createSidebarComponentHTML();

// Render content through routes
Router.run(Routes, (Handler) => {
    React.render(<Handler/>, document.getElementById('content'))
})
