const fs = require('fs')
const utils = require('../utils')

const BABEL_RC_FILENAME = '.babelrc'

module.exports = () => {
  if (utils.fileExists('.babelrc')) {
    return JSON.parse(fs.readFileSync(BABEL_RC_FILENAME, 'utf-8'))
  } else {
    return Object.create(null)
  }
}
