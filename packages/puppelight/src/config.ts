import { Config, Flags } from 'lighthouse'
import path, { dirname } from 'path'
import { PuppeteerLaunchOptions } from 'puppeteer'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ROOT_PATH = path.join(__dirname, '..')

export const LAUNCH_OPTIONS: PuppeteerLaunchOptions = {
  headless: false,
  // devtools: true,
  // 去掉浏览器自动化标识
  ignoreDefaultArgs: ['--enable-automation'],
}

export const EXTRA_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
}

export const LIGHTHOUSE_FALGS: Flags = {
  onlyCategories: ['performance'],
  output: 'html',
  locale: 'zh',
}

export const LIGHTHOUSE_CONFIG: Config = {
  extends: 'lighthouse:default',
}
