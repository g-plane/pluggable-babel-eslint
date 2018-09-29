const applyConfig = require('../../lib/config')

test('return empty array by default', () => {
  expect(applyConfig()).toHaveLength(0)
})

test('detect typescript', () => {
  const cwd = process.cwd()

  process.chdir(
    __dirname + '/fixture/typescript/babel-plugin-syntax-typescript'
  )
  expect(applyConfig()).toContain('typescript')

  process.chdir(
    __dirname + '/fixture/typescript/babel-plugin-transform-typescript'
  )
  expect(applyConfig()).toContain('typescript')

  process.chdir(
    __dirname + '/fixture/typescript/babel-preset-typescript'
  )
  expect(applyConfig()).toContain('typescript')

  process.chdir(cwd)
})
