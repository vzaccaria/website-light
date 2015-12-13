import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router'

import { bioPage } from './pages/bio';
import { researchPage } from './pages/research';
import BlogPage from './pages/blog'
import BlogIndex from './pages/blogIndex';
import TeachingPage from './pages/teaching';
import { projectsPage } from './pages/projects';

const debug = require('./react-utils/debug')(__filename);


let Routes = React.createClass({
    render() {
        return (
            <div className="site_container">
                <Router>
                    <Route path="/" >
                        <IndexRoute component={bioPage} />
                        <Route path="/research" component={researchPage}> </Route>
                        <Route path="/teaching" component={TeachingPage}> </Route>
                        <Route path="/projects" component={projectsPage}> </Route>
                        <Route path="/:category" component={BlogIndex}> </Route>
                        <Route path="/:category/:year/:month/:day/:title" component={BlogPage}>
                        </Route>
                    </Route>
                </Router>
            </div>
        );}
});

module.exports = { Routes }
