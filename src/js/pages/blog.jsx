import React from 'react';
import _ from 'lodash';
import { _b } from '../react-utils/react-bem'
import { fetchPost } from '../stores/fetcher'
import hjs from 'highlight.js'
import jq from 'jquery'


// debug..
const debug = require('../react-utils/debug')(__filename);

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
                    {_.map(postData.tags, (t, i) => <div key={i} className={c('tag')}> {t} </div>)} </div>
            </div>
        </div>
    );
}

export default class BlogPage extends React.Component {

    constructor() {
        super();
        this.state = { valid: false };
    }

    componentDidMount(root) {
        hjs.configure({
            useBR: false,
            languages: ['c', 'matlab', 'cpp']
        });
        fetchPost(this.props.params.category, this.props.params).then((postData) => {
            let valid = true
            this.setState({postData, valid});
        }).then( () => {
            debug("Updating Mathjax..");
            MathJax.Hub.Config({tex2jax:{inlineMath:[['$','$'],['\\(','\\)']]}});
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        })
    }

    componentWillReceiveProps(props) {
        fetchPost(props.params.category, props.params).then((postData) => {
            let valid = true
            this.setState({postData, valid});
        });
    }

    componentDidUpdate(props, state, root) {
        debug('component did update');
        jq('code.language-octave').removeClass('language-octave').addClass('matlab');
        jq('code.language-c').removeClass('language-c').addClass('c');
        jq('pre code').each((i, b) => {
            hjs.highlightBlock(b);
        });
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }

    render() {
        if(this.state.valid) {
            let c = _.partial(_b, 'post_container');
            return (
                <div className={c()} >
                    <div className={c('post__title')}> {this.state.postData.title} </div>
                    {subTitle(this.state.postData)}
                    <div className="post_text">
                        <div dangerouslySetInnerHTML={{ __html: this.state.postData.markup}}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}
