import test from 'ava'
import { each } from 'test-each'

import { runCli, runSerial, runParallel } from './helpers/run.js'
import { TEST_VERSION } from './helpers/versions.js'

const FIXTURES_DIR = `${__dirname}/helpers/fixtures`

each([runCli, runSerial, runParallel], ({ title }, run) => {
  test(`Forward exit code on success | ${title}`, async (t) => {
    const { exitCode } = await run('', TEST_VERSION, 'node --version')

    t.is(exitCode, 0)
  })

  test(`Forward exit code on failure | ${title}`, async (t) => {
    const { exitCode } = await run('', TEST_VERSION, 'node -e process.exit(2)')

    t.is(exitCode, 2)
  })

  test(`Default exit code to 1 | ${title}`, async (t) => {
    const { exitCode } = await run(
      '',
      TEST_VERSION,
      'node -e process.kill(process.pid)',
    )

    t.is(exitCode, 1)
  })

  test(`Can use aliases | ${title}`, async (t) => {
    const { stdout } = await run('', 'c', 'node --version', {
      cwd: `${FIXTURES_DIR}/nvmrc`,
    })

    t.true(stdout.includes(TEST_VERSION))
  })
})
