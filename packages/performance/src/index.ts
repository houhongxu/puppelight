import { EXTRA_HEADERS, LAUNCH_OPTIONS } from './config'
import lighthouse, { Flags } from 'lighthouse'
import puppeteer from 'puppeteer'

export async function main(url: string) {
  const browser = await puppeteer.launch(LAUNCH_OPTIONS)

  const page = await browser.newPage()

  // 设置浏览器
  await page.setExtraHTTPHeaders(EXTRA_HEADERS)
  await page.setViewport({
    width: 1920,
    height: 1080,
  })

  // 访问
  console.log('开始访问页面')

  await page.goto(url)

  // 性能
  const FALGS: Flags = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
  }

  const runnerResult = await lighthouse(url, FALGS)

  console.log(runnerResult)
}

main('https://www.baidu.com/')
