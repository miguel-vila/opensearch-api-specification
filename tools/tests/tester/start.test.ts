import { spawnSync } from 'child_process'
import * as ansi from '../../src/tester/Ansi'

const spec = (args: string[]): any => {
  const start = spawnSync('ts-node', ['tools/src/tester/start.ts'].concat(args), {
    env: { ...process.env, OPENSEARCH_PASSWORD: 'password' }
  })
  return {
    stdout: start.stdout?.toString(),
    stderr: start.stderr?.toString()
  }
}

test('--help', async () => {
  expect(spec(['--help']).stdout).toContain('Usage: start [options]')
})

test('--invalid', async () => {
  expect(spec(['--invalid']).stderr).toContain("error: unknown option '--invalid'")
})

test('--tests', async () => {
  expect(spec(['--tests', 'tools/tests/tester/fixtures']).stdout).toContain(
    `${ansi.green('PASSED ')} ${ansi.cyan(ansi.b('empty.yaml'))}`
  )
})

test.todo('--tab-width')
test.todo('--verbose')
test.todo('--spec')
