import { promises as fs } from 'fs'
import axios from 'axios'
import { JSDOM } from 'jsdom'

const ENTRY = 'http://kaomoji.ru/en/'

export async function fetch() {
  const { data } = await axios.get(ENTRY, { responseType: 'text' })
  const { window } = new JSDOM(data)
  const { document } = window

  const result: Record<string, string[]> = {}
  Array.from(document.querySelectorAll('h3 > a[name]'))
    .forEach((el) => {
      const name = el.getAttribute('name')
      if (!name)
        return

      const mojis = Array.from(el.parentElement?.nextElementSibling?.nextElementSibling?.querySelectorAll('.table_kaomoji td > span') || [])
        .map(i => i.textContent)
        .filter(Boolean) as string[]

      result[name] = mojis
    })

  await fs.writeFile('src/kaomoji.ts', `export const Mojis: Record<string, string[]> = ${JSON.stringify(result, null, 2)}\n`, 'utf-8')
}

fetch()
