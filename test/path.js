import { env as processEnv } from 'process'
import { normalize } from 'path'

import test from 'ava'
import { each } from 'test-each'
import { getBinPathSync } from 'get-bin-path'
import execa from 'execa'

import { HELPER_VERSION, getStdout } from './helpers/main.js'

const FORK_FILE = normalize(`${__dirname}/helpers/fork.js`)
const BIN_PATH = getBinPathSync()

each(
  [
    ['node', '--version'],
    ['node', FORK_FILE, 'node', '--version'],
    ['node', BIN_PATH, HELPER_VERSION, 'node', '--version'],
  ],
  [undefined, { title: 'env', env: processEnv }],
  ({ title }, args, spawnOpts) => {
    test(`Works with child processes | ${title}`, async t => {
      const stdout = await getStdout({
        versionRange: HELPER_VERSION,
        command: 'node',
        args: [FORK_FILE, ...args],
        spawnOpts,
      })

      t.is(stdout, `v${HELPER_VERSION}`)
    })
  },
)

test('Works with nyc as child', async t => {
  const stdout = await getStdout({
    versionRange: HELPER_VERSION,
    command: 'nyc',
    args: ['--silent', '--', 'node', '--version'],
  })

  t.is(stdout, `v${HELPER_VERSION}`)
})

test('Works with nyc as parent with node command', async t => {
  const { stdout } = await execa.command(
    `nyc --silent -- ${BIN_PATH} ${HELPER_VERSION} node --version`,
  )

  t.is(stdout, `v${HELPER_VERSION}`)
})
