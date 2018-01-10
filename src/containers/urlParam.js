const urlParamHash = {
    getParam: getParam,//获取单个参数
    setParam: setParam,//设置单个参数
    removeParam: removeParam,//移除单个参数
    getParams: getParams,//获取多个参数
    setParams: setParams,//设置多个参数
    removeParams :removeParams,//移除多个参数
    getHash: getHash,//获取 hash
    setHash: setHash, //设置 hash
    removeHash: removeHash//移除 hash
};

/**
 * [getParam 获取单个参数]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
function getParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * [setParam 设置单个参数]
 * @param {String} name
 * @param {String|Number} val
 * @return {String|Boolean}
 */
function setParam(name, val, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    let _name = name.replace(/[\[\]]/g, '\\$&');
    let value = name + '=' + encodeURIComponent(val);
    let regex = new RegExp(_name + '=[^&]*');
    let urlArr = url.split('#');
    let result = '';

    if(regex.exec(url)){
        result =  url.replace(regex, value);
    }else{
        result = urlArr[0]+'&'+value+ (urlArr[1] || '');
    }

    return result
}

/**
 * [removeParam 移除单个参数]
 * @param  {String} name
 * @param  {String} url   [default:location.href]
 * @return {String|Boolean}
 */
function removeParam(name, url) {
    if(typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    let urlparts = url.split('?');
    let prefix = encodeURIComponent(name + '=');
    let pars = urlparts[1].split(/[&;]/g);
    let i = 0, len = pars.length;

    for (; i < len; i++) {
        if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
            pars.splice(i, 1);
        }
    }

    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');

    return url;
}

/**
 * [getParams 获取多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}
 */
function getParams(names, url) {
    if(typeof name !== 'string') return false;
    let newNames = names.split(' ');
    let result = {};
    let i = 0,
        len = newNames.length;
    if (names.length === 0) return false;
    for (; i < len; i++) {
        result[newNames[i]] = getParam(newNames[i], url);
    }
    return result;
}

/**
 * [setParams 设置多个参数]
 * @param {Object} obj
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}
 */
function setParams(obj, url) {
    let result = url || '';
    if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
    for (let name in obj) {
        result = setParam(name, obj[name], result);
    }
    return result;
}

/**
 * [removeParams 移除多个参数]
 * @param  {String} names [多个用空格分割]
 * @param  {String} url   [default:location.href]
 * @return {[String|Boolean]}
 */
function removeParams(names, url) {
    let result = url || '';
    let newNames = names.split(' ');
    let i = 0,
        len = newNames.length;
    if (newNames.length === 0) return false;

    for (; i < len; i++) {
        result = removeParam(newNames[i], result);
    }
    return result;
}

/**
 * [getHash 方法]
 * @param  {[String]} url [default:location.href]
 * @return {[String]}
 */
function getHash(url) {
    return decodeURIComponent(
        url ?
            url.substring(url.indexOf('#') + 1) :
            window.location.hash.substr(1)
    );
}

/**
 * [setHash 方法]
 * @param {String} hash
 */
function setHash(hash) {
    window.location.replace('#' + encodeURIComponent(hash));
}

/**
 * [removeHash 方法]
 */
function removeHash() {
    window.location.replace('#', '');
}

export default urlParamHash;