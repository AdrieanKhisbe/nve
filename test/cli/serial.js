import test from 'ava'

import { TEST_VERSION, OLD_TEST_VERSION } from '../helpers/versions.js'
import { runCli, runCliSerial } from '../helpers/run.js'

test('No commands | CLI runCliSerial', async t => {
  const { stdout } = await runCliSerial('', `v${TEST_VERSION}`, '')

  t.is(stdout, `${TEST_VERSION}\n${TEST_VERSION}`)
})

test(`Forward exit code and output on late failure | CLI runCliSerial`, async t => {
  const { exitCode, all } = await runCli(
    '',
    `${TEST_VERSION} ${OLD_TEST_VERSION}`,
    'node -p Buffer.from("")',
  )

  t.is(exitCode, 1)
  t.true(
    all.startsWith(`<>  Node ${TEST_VERSION}

<Buffer >

 <>  Node ${OLD_TEST_VERSION}

[eval]:1`),
  )
})