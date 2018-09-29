const fileRelative = require('../../lib/config/file-relative')

test('return empty object if file not found', () => {
  const config = fileRelative()
  expect(config.presets).toBeUndefined()
  expect(config.plugins).toBeUndefined()
})

test('return data if file exists', () => {
  const cwd = process.cwd()
  process.chdir(__dirname + '/fixture/babelrc')

  expect(fileRelative()).toStrictEqual({ presets: [] })

  process.chdir(cwd)
})
