const I18n = function (locales, callback) {
    this.body = document.getElementsByTagName('body')[0]
    this.locales = locales
    this.language = null
    this.originalBodyContent = this.body.innerHTML
    this.callback = callback
}

I18n.prototype.replaceContentByRegx = function (language) {
    try {
        if (this.language === language) return
        const regx = new RegExp(/\{\!(.*)\!\}/g)
        const htmlContent = this.originalBodyContent.replace(regx, function (_, $1) {
            return this.findContentByKey($1, language)
        }.bind(this))
        this.body.innerHTML = htmlContent
        this.language = language
        this.callback && this.callback(htmlContent)
    } catch (ignore) {
    }
}

I18n.prototype.findContentByKey = function (name, language) {
    let value = ''
    if (!name) return value
    const keys = name.split('.')
    try {
        value = keys.reduce(function(a, b) {
            if (this.isString(a)) {
                a = this.locales[a]
            }
            return a[b]
        }.bind(this))[language]
        return this.isString(value) ? value : ''
    } catch (e) {
        return value
    }
}

I18n.prototype.isString = function (obj) {
    if (Object.getPrototypeOf(obj) === String.prototype) {
        return true
    } else {
        return false
    }
}