import agent from '../react-utils/agent'
import $b from 'bluebird'
import _ from 'lodash'
const debug = require('../react-utils/debug')(__filename);


let siteData = require('../../../data/site.json')
let { indexurl, baseurl } = siteData


let fetcher = () => {
    function fetchIndex() {
        return agent('GET', indexurl).set('Accept', 'application/json').end().then((r) => {
            return r.body
        })
    }

    function fetchPostMarkup(category, {year,month,day,title}) {
        return agent('GET',`${baseurl}/${category}/${year}/${month}/${day}/${title}`).end().then((r) => { return r.text })
    }

    function fetchPost(category, {year,month,day,title}) {
        return fetchIndex().then((postList) => {
            let link =  `/${category}/${year}/${month}/${day}/${title}`;
            debug(link)
            let postData = _.head(_.filter(postList, (it) => {
                return it.link === link
            }));
            debug(postData)
            return fetchPostMarkup(category, {year, month, day, title}).then( (postMarkup) => {
                postData.markup = postMarkup;
                return postData
            })
        })
    }

    let tmpl = function(string) {
        return _.template(string)(siteData)
    }

    return {
        fetchPost, fetchIndex, tmpl
    }

}


module.exports = fetcher()
