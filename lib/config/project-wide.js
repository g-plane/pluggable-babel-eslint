const path = require('path')
const utils = require('../utils')

const noop = () => {}

const fakeApi = {
  version: require('../../package.json')
    .peerDependencies['@babel/parser']
    .substring(1),
  cache: {
    forever: noop,
    never: noop,
    using: noop,
    invalidate: noop,
  },
  env: arg => {
    const argType = typeof arg
    const NODE_ENV = process.env.NODE_ENV

    if (argType === 'string') {
      return NODE_ENV === arg
    } else if (Array.isArray(arg)) {
      return arg.includes(NODE_ENV)
    } else if (argType === 'undefined') {
      return NODE_ENV
    } else {
      return arg(NODE_ENV)
    }
  },
  caller: cb => cb({ name: '@babel/parser' }),
  assertVersion: noop
}

module.exports = () => {
  const BABEL_CONFIG_FILEPATH = path.resolve('babel.config.js')

  if (utils.fileExists(BABEL_CONFIG_FILEPATH)) {
    const config = require(BABEL_CONFIG_FILEPATH)

    if (typeof config === 'function') {
      return config(fakeApi)
    } else {
      return config
    }
  } else {
    return Object.create(null)
  }
}
