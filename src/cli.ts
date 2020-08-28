import moji from './kaomoji.json'

process.stdout.write(`${moji[Math.floor(Math.random() * moji.length)]}\n`)
