import test from 'ava'
import hasAnsi from 'has-ansi'

import { TEST_VERSION } from '../helpers/versions.js'
import { runCliSerial } from '../helpers/run.js'

test('Prints headers | runCliSerial', async t => {
  const { all } = await runCliSerial('', TEST_VERSION, 'node --version')

  t.is(
    all,
    `<>  Node ${TEST_VERSION}\n\nv${TEST_VERSION}\n\n <>  Node ${TEST_VERSION}\n\nv${TEST_VERSION}`,
  )
})

test('Prints headers in colors | runCliSerial', async t => {
  const { stderr } = await runCliSerial('', TEST_VERSION, 'node --version', {
    env: { FORCE_COLOR: '1' },
  })

  t.true(hasAnsi(stderr))
})

test('Prints headers in correct order | runCliSerial', async t => {
  const { all } = await runCliSerial('', TEST_VERSION, 'echo test')

  t.is(
    all,
    `<>  Node ${TEST_VERSION}\n\ntest\n\n <>  Node ${TEST_VERSION}\n\ntest`,
  )
})
