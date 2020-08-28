import { Mojis } from './kaomoji'

const category = process.argv[2] || undefined

if (category === '-h') {
  process.stdout.write(`Avaliable Categories:\n\n  ${Object.keys(Mojis).join('\n  ')}\n\n`)
  process.exit(0)
}

if (category && !Mojis[category]) {
  process.stderr.write(`Unknown category ${category}\n`)
  process.exit(1)
}

const moji = category ? Mojis[category] : Object.values(Mojis).flatMap(i => i)

process.stdout.write(`${moji[Math.floor(Math.random() * moji.length)]}\n`)
