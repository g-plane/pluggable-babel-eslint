const { parse } = require('../..')

test('convert type assertion node', () => {
  const code = '<a>b'
  expect(parse(code, {
    plugins: ['typescript'], excludePlugins: ['jsx']
  })).toMatchSnapshot()
})
