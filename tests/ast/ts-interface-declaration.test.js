const { parse } = require('../..')

test('interface without inheritance', () => {
  const code = 'interface I {}'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})

test('interface with inheritance', () => {
  const code = 'interface I extends A, B {}'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})
