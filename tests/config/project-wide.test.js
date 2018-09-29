const projectWide = require('../../lib/config/project-wide')

test('return empty object if file not found', () => {
  const config = projectWide()
  expect(config.presets).toBeUndefined()
  expect(config.plugins).toBeUndefined()
})

test('return data with object-style config', () => {
  const cwd = process.cwd()
  process.chdir(__dirname + '/fixture/object-style-config')

  const config = projectWide()
  expect(config).toStrictEqual({ presets: [] })

  process.chdir(cwd)
})

test('return data with function-style config', () => {
  const cwd = process.cwd()
  process.chdir(__dirname + '/fixture/function-style-config')

  const config = projectWide()
  expect(config).toStrictEqual({ presets: [] })

  process.chdir(cwd)
})
