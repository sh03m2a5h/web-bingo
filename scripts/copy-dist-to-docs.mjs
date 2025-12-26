import { cpSync, existsSync, rmSync } from 'node:fs'

if (existsSync('docs')) {
  rmSync('docs', { recursive: true, force: true })
}

cpSync('dist', 'docs', { recursive: true })
