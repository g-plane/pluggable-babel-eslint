module.exports = (keys, isTS) => {
  if (isTS) {
    keys.Identifier = keys.Identifier.filter(key => key !== 'typeAnnotation')

    keys.FunctionDeclaration = keys.FunctionDeclaration.filter(
      key => key !== 'returnType'
    )
  }

  return keys
}
