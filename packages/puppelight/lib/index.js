import { EXTRA_HEADERS, LAUNCH_OPTIONS, LIGHTHOUSE_CONFIG, LIGHTHOUSE_FALGS, ROOT_PATH, } from './config.js';
import fs from 'fs/promises';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
export default async function main(url) {
    const browser = await puppeteer.launch(LAUNCH_OPTIONS);
    const page = await browser.newPage();
    // 设置浏览器
    await page.setExtraHTTPHeaders(EXTRA_HEADERS);
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    // 访问
    console.log('开始访问页面：', url);
    await page.goto(url);
    // 性能
    const runnerResult = await lighthouse(url, LIGHTHOUSE_FALGS, LIGHTHOUSE_CONFIG, page);
    const html = (Array.isArray(runnerResult?.report)
        ? runnerResult?.report[0]
        : runnerResult?.report) ?? '';
    await fs.writeFile(ROOT_PATH + '/index.html', html);
    console.log('生成成功');
    console.log('分数：', (runnerResult?.lhr.categories.performance.score ?? 0) * 100);
    await page.close();
    await browser.close();
}
