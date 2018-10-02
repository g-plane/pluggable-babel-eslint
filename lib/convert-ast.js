const traverse = require('@babel/traverse').default

module.exports = (ast, isTS) => {
  if (isTS && !ast.body.length) {
    ast.range[0] = ast.range[1]
  }

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

      if (path.isTSConstructSignatureDeclaration()) {
        node.type = 'TSConstructSignature'
        node.params = node.parameters
      }

      if (path.isClassDeclaration()) {
        const impls = node.implements || []
        impls.forEach(impl => {
          if (impl.type === 'TSExpressionWithTypeArguments') {
            impl.type = 'ClassImplements'
            impl.id = impl.expression
          }
        })
      }

      if (path.isTSTypeAliasDeclaration()) {
        node.type = 'VariableDeclaration'
        node.kind = 'type'
        node.declarations = [{
          type: 'VariableDeclarator',
          range: [node.range[0] + 5, node.range[1]],
          loc: {
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + 5
            },
            end: node.loc.end
          },
          start: node.start + 5,
          end: node.end,
          id: node.id,
          init: node.typeAnnotation,
          typeParameters: node.typeParameters
        }]
      }
    }
  })

  return ast
}
