import React from 'react';
import Router from 'react-router';
import { Link, Route, DefaultRoute } from 'react-router';

import { bioPage } from './pages/bio';
import { researchPage } from './pages/research';
import BlogPage from './pages/blog'
import BlogIndex from './pages/blogIndex';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:routes.jsx');


let Routes = (
    <Route path="/" >
        <DefaultRoute handler={bioPage} />
        <Route path="/research" handler={researchPage}> </Route>
        <Route path="/:category" handler={BlogIndex}> </Route>
        <Route path="/:category/:year/:month/:day/:title" handler={BlogPage}>
        </Route>
    </Route>
);

module.exports = { Routes }
