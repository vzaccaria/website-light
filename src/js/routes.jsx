import React from 'react';
import Router from 'react-router';
import { Link, Route } from 'react-router';
import { bioPage } from './pages/bio';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:routes.jsx');


let Routes = (
    <Route path="/" handler={bioPage}>
    </Route>
);

module.exports = { Routes }
