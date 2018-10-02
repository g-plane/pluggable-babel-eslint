const { parse } = require('../..')

test('node type conversion', () => {
  const code = 'class Foo implements Component<T>{}'
  expect(parse(code, { plugins: ['typescript'] })).toMatchSnapshot()
})
