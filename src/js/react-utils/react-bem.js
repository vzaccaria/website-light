import _ from 'lodash'

let _b = function(bname, ename, mname) {

            if(_.isUndefined(ename)) {
                return bname
            } else {
                let el = `${bname}__${ename}`
                if(_.isUndefined(mname)) {
                    return el;
                }  else {
                    el = el + ` ${bname}__${ename}--${mname}`
                    return el;
                }
            }
        }

module.exports = { _b }
