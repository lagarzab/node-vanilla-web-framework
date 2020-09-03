function parse (url) {
    let str = ''
    for (let i = 0; i < url.length; i++) {
        const char = url.charAt(i)
        if (char === ':') {
            let param = ''
            let c
            for (c = i + 1; c < url.length; c++) {
                if (/\w/.test(url.charAt(c))) {
                    param += url.charAt(c)
                } else {
                    break
                }
            }
            str += `(?<${param}>\\w+)`
            i = c - 1
        } else {
            str += char
        }
    }
    return `^${ str }$`
}

module.exports = parse
