function parse (url) {
    let str = ''
    for (let i = 0; i < url.length; i++) {
        const char = url.charAt(i)
        if (char === ':') {
            let param = ''
            let c = i+1
            for (let j = c; j < url.length; j++) {
                if (/\w/.test(url.charAt(j))) {
                    param += url.charAt(j)
                } else {
                    c = j
                    break
                }
            }
            str += `(?<${param}>\\w+)`
            i = c
            console.log('a str=', str)
        } else {
            str += char
            console.log('b str=', str)
        }
    }
    return str
}

module.exports = parse
