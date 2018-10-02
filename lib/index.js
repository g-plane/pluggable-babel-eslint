const parser = require('@babel/parser')
const readPluginsFromConfig = require('./config')
const convertAST = require('./convert-ast')
const modifyVisitorKeys = require('./visitor-keys')

let plugins = readPluginsFromConfig()
let excludePlugins = []

// Patch for babel-parser
const originalBabel = parser.parse
parser.parse = (code, options) => {
  options.plugins = options.plugins || []
  const isTS = plugins.includes('typescript')

  if (isTS) {
    options.plugins = options.plugins.filter(plugin => {
      if (typeof plugin === 'string') {
        return plugin !== 'estree'
      } else {
        return plugin[0] !== 'flow'
      }
    })

    // Add plugins for TypeScript, and DO NOT change the order of unshifting.
    options.plugins.unshift('typescript')
    options.plugins.unshift('estree')
  }

  excludePlugins.forEach(plugin => {
    options.plugins = options.plugins.filter(p => {
      if (typeof p === 'string') {
        return p !== plugin
      } else {
        return p[0] !== plugin
      }
    })
  })

  return originalBabel(code, options)
}

// Patch for babel-eslint
const babelEslint = require('babel-eslint')
const originalParse = babelEslint.parse
const originalParseForESLint = babelEslint.parseForESLint
const originalParseNoPatch = babelEslint.parseNoPatch
babelEslint.parse = (code, options = {}) => {
  plugins = options.plugins || plugins
  excludePlugins = options.excludePlugins || excludePlugins

  const ast = originalParse(code, options)
  return convertAST(ast, plugins.includes('typescript'))
}
babelEslint.parseForESLint = (code, options = {}) => {
  plugins = options.plugins || plugins
  excludePlugins = options.excludePlugins || excludePlugins

  const result = originalParseForESLint(code, options)
  convertAST(result.ast, plugins.includes('typescript'))
  modifyVisitorKeys(result.visitorKeys, plugins.includes('typescript'))
  return result
}
babelEslint.parseNoPatch = (code, options = {}) => {
  plugins = options.plugins || plugins
  excludePlugins = options.excludePlugins || excludePlugins

  const ast = originalParseNoPatch(code, options)
  return convertAST(ast, plugins.includes('typescript'))
}
module.exports = babelEslint
