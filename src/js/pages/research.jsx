import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { getTables } from 'mdtable2json';
import { Publication } from './components/publication.jsx'

import { processData } from '../react-utils/normalize-pubs'

import { _b } from '../react-utils/react-bem'

// Debug..
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:pages/research.jsx');

var current_research = require('raw!../../../data/current_research.md');

var research_achievements = require('raw!../../../data/research_achievements.md');

var biblioJson = _.map(JSON.parse(require('raw!../../../data/biblio.json')), processData);

debug(current_research)
let researchPage = React.createClass({
    render() {
        debug("Showing research");

        let p = _.partial(_b, 'publications');
        let s = _.partial(_b, 'statement');

        return (
            <div className={p()}>

                <div className={s()}>
                    <div className={s('title')}>
                        Current research
                    </div>
                    <div className={s('summary')}>
                        <ReactMarkdown source={current_research}>
                        </ReactMarkdown>
                    </div>
                </div>

                <div className={s()}>
                    <div className={s('title')}>
                        Past research and achievements
                    </div>
                    <div className={s('summary')}>
                        <ReactMarkdown source={research_achievements}>
                        </ReactMarkdown>
                    </div>
                </div>

                <div className={p('header')}>
                    Publications
                </div>
                <div className={p('container')}>
                    {_.map(biblioJson, (it) => {
                        return (
                            <Publication data={it}>
                            </Publication>
                            );
                        })}
                </div>
            </div>
        );
    }});


module.exports = { researchPage }
