import React from 'react';
import Router from 'react-router';
import { Link, Route, DefaultRoute } from 'react-router';

import { bioPage } from './pages/bio';
import { researchPage } from './pages/research';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:routes.jsx');


let Routes = (
    <Route path="/" >
        <DefaultRoute handler={bioPage} />
        <Route path="/research.html" handler={researchPage}>
        </Route>
    </Route>
);

module.exports = { Routes }
