import agent from '../react-utils/agent'
import $b from 'bluebird'
import _ from 'lodash'
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:stores/fetcher.jsx');



let baseurl  = 'http://www.vittoriozaccaria.net/website-light'
let indexurl = `${baseurl}/data/index.json`

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

    return {
        fetchPost, fetchIndex
    }

}


module.exports = fetcher()
