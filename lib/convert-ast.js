const traverse = require('@babel/traverse').default

module.exports = ast => {
  traverse(ast, {
    noScope: true,
    exit(path) {
      const { node } = path

      if (path.isTSInterfaceDeclaration()) {
        node.heritage = node.extends || []
      }

      if (path.isTSTypeAssertion()) {
        node.type = 'TSTypeAssertionExpression'
        node.loc.start.column--
        const typeAnnotation = Object.assign({}, node.typeAnnotation)
        node.typeAnnotation.typeAnnotation = typeAnnotation
      }
    }
  })

  return ast
}
