import { PuppeteerLaunchOptions } from 'puppeteer'

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
