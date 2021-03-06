import test from 'ava'
import { each } from 'test-each'

import { runCli } from './helpers/run.js'
import { TEST_VERSION, INVALID_VERSION } from './helpers/versions.js'

each(
  [
    { versionRange: '', command: '' },
    { versionRange: INVALID_VERSION, command: 'node --version' },
    { versionRange: TEST_VERSION, command: 'invalid' },
  ],
  ({ title }, { versionRange, command }) => {
    test(`Invalid input message | ${title}`, async (t) => {
      const { stderr } = await runCli('', versionRange, command)

      t.true(stderr.includes('Invalid input'))
    })
  },
)
