const parser = require('..')

test('visitor keys of Identifier', () => {
  expect(
    parser
      .parseForESLint('', { plugins: ['typescript'] })
      .visitorKeys
      .Identifier
  ).not.toContain('typeAnnotation')
})

test('visitor keys of FunctionDeclaration', () => {
  expect(
    parser
      .parseForESLint('', { plugins: ['typescript'] })
      .visitorKeys
      .FunctionDeclaration
  ).not.toContain('returnType')
})
