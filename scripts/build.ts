import { execSync } from 'child_process'
import fs from 'fs'

execSync('tsup src/cli.ts --format cjs', { stdio: 'inherit' })

const dist = 'dist/cli.js'
fs.writeFileSync(dist, `#!/usr/bin/env node\n${fs.readFileSync(dist, 'utf-8')}`, 'utf-8')

execSync(`chmod -x ${dist}`, { stdio: 'inherit' })
