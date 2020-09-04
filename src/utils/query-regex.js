function parse (url) {
    const results = url.match(/\?(?<query>.*)/)
    
    if (!results) return {}
    const { groups: { query } } = results
    
    let params = {}

    let index = 0
    while (index < query.length) {
        let next = query.indexOf('&', index)
        let len = (next > 0 ? next : query.length)
        let param = query.substring(index, len)
        let [key, value] = param.trim().split('=')
        
        if (key !== '&') params[key] = value ? value.replace(/(%20)|(\+)/g, ' ') : ''

        index = (next > 0 ? next : len) + 1
    }

    return params
}

module.exports = parse
