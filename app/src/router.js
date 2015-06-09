var page = require('page')
var logger = require('./modules/Logger')

page('*', require('./modules/page.logger'), require('./modules/page.tracker'), require('./modules/page.scrollToTop')(['statistics']))
page('/', require('./pages/Main'))
page('/about', require('./pages/About'))
page('/statistics', require('./pages/Statistics'))

module.exports.start = page.start
