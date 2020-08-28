import { promises as fs } from 'fs'
import axios from 'axios'
import { JSDOM } from 'jsdom'

const ENTRY = 'http://kaomoji.ru/en/'

export async function fetch() {
  const { data } = await axios.get(ENTRY, { responseType: 'text' })
  const { window } = new JSDOM(data)
  const { document } = window
  const moji = Array.from(document.querySelectorAll('.table_kaomoji td > span'))
    .map(i => i.textContent)
    .filter(Boolean)
  await fs.writeFile('src/kaomoji.json', `${JSON.stringify(moji)}\n`, 'utf-8')
}

fetch()
