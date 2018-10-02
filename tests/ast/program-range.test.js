const { parse } = require('../..')

test('empty body', () => {
  const code = '//abc'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})

test('non-empty body', () => {
  const code = '//abc\nabc'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})
