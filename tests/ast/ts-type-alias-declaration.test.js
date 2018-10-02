const { parse } = require('../..')

test('node type conversion', () => {
  const code = 'type a = b'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})
