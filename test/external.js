// Packages
import test from 'ava'

// Ours
import plugin from '../src/babel-external'
import read from './_read'
import _transform from './_transform'

const transform = (file, opts = {}) => (
  _transform(file, {
    plugins: [plugin],
    ...opts
  })
)

test('transpiles external stylesheets', async t => {
  const {code} = await transform(
    './fixtures/styles.js',
    {sourceMaps: true}
  )
  const out = await read('./fixtures/styles.out.js')
  t.is(code, out.trim())
})

test('transpiles external stylesheets (CommonJS modules)', async t => {
  const {code} = await transform('./fixtures/styles2.js')
  const out = await read('./fixtures/styles2.out.js')
  t.is(code, out.trim())
})
