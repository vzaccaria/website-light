// research.jsx ---

// Copyright (C) 2015 Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Author: Vittorio Zaccaria <vittorio.zaccaria@gmail.com>

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// Except as contained in this notice, the name(s) of the above copyright
// holders shall not be used in advertising or otherwise to promote the sale,
// use or other dealings in this Software without prior written authorization.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import React from 'react';
import _ from 'lodash';
import { _b } from '../react-utils/react-bem'
import { fetchPost } from '../stores/fetcher'
import hjs from 'highlight.js'
import jq from 'jquery'

// debug..
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:pages/blogpage.jsx');

let subTitle = (postData) => {
    let c = _.partial(_b, 'post_container__post');
    return (
        <div className={'post_container__post__subtitle'}>
            <div className={c('date')}>
                <i className="fa fa-calendar-o" />
                <div className={c('date_value')}> {postData.formattedDate} </div>
            </div>
            <div className={c('category')}>
                <i className="fa fa-flag-o" />
                <div className={c('category_value')}> {postData.category} </div>
            </div>
            <div className={c('tags')}>
                <i className="fa fa-tags" />
                <div className={c('category_value')}>
                    {_.map(postData.tags, (t) => <div className={c('tag')}> {t} </div>)} </div>
            </div>
        </div>
    );
}

export default class BlogPage extends React.Component {

    constructor() {
        super();
        this.state = { valid: false };
    }

    componentDidMount() {
        hjs.configure({
            useBR: false,
            languages: ['c', 'matlab', 'cpp']
        });
        fetchPost(this.props.params.category, this.props.params).then((postData) => {
            let valid = true
            this.setState({postData, valid});
        });
    }

    componentWillReceiveProps(props) {
        fetchPost(props.params.category, props.params).then((postData) => {
            let valid = true
            this.setState({postData, valid});
        });
    }

    componentDidUpdate() {
        debug('component did update');
        jq('code.language-octave').removeClass('language-octave').addClass('matlab');
        jq('code.language-c').removeClass('language-c').addClass('c');
        jq('pre code').each((i, b) => {
            hjs.highlightBlock(b);
            });
    }

    render() {
        if(this.state.valid) {
            let c = _.partial(_b, 'post_container');
            return (
                <div className="site_container">
                    <div className={c()} >
                        <div className={c('post__title')}> {this.state.postData.title} </div>
                        {subTitle(this.state.postData)}
                        <div className="post_text">
                            <div dangerouslySetInnerHTML={{ __html: this.state.postData.markup}}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div> just nothing yet </div>
            );
        }
    }
}
