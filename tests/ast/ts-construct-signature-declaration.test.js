const { parse } = require('../..')

test('node type conversion', () => {
  const code = 'interface I { new() }'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})
