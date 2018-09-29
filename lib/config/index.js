const projectWide = require('./project-wide')
const fileRelative = require('./file-relative')

module.exports = () => {
  const parserPlugins = []

  const { presets = [], plugins = [] } = Object.assign(
    Object.create(null),
    projectWide(),
    fileRelative()
  )

  if (
    presets.includes('@babel/preset-typescript') ||
    plugins.includes('@babel/plugin-transform-typescript') ||
    plugins.includes('@babel/plugin-syntax-typescript')
  ) {
    parserPlugins.push('typescript')
  }

  return parserPlugins
}
