module.exports = api => {
  // Make sure the APIs are available
  api.cache.forever()
  api.cache.never()
  api.cache.using()
  api.cache.invalidate()

  api.caller(caller => caller.name === '@babel/parser')

  api.env('test')
  api.env(['test'])
  api.env()
  api.env(env => env === undefined)

  return { presets: [] }
}
