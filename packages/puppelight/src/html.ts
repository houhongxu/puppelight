import { ROOT_PATH } from './config.js'
import fs from 'fs/promises'

export async function outputHtml(html: string) {
  await fs.writeFile(ROOT_PATH + '/index.html', html)

  console.log('生成成功', ROOT_PATH + '/index.html')
}

export async function generatePureHtml(html: string) {}
