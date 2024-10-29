import { EXTRA_HEADERS, LAUNCH_OPTIONS, LIGHTHOUSE_CONFIG, LIGHTHOUSE_FALGS, } from './config.js';
import { sendEmail } from './email.js';
import { outputHtml } from './html.js';
import { createServe } from './serve.js';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';
export async function run({ url, isGenerateHtml, isOpenServe, isHeadless, email, port = '9000', }) {
    // 初始化浏览器
    const browser = await puppeteer.launch({
        ...LAUNCH_OPTIONS,
        headless: isHeadless,
    });
    const page = await browser.newPage();
    // 设置浏览器
    await page.setExtraHTTPHeaders(EXTRA_HEADERS);
    await page.setViewport({
        width: 1920,
        height: 1080,
    });
    // 访问页面
    console.log('开始访问页面：', url);
    await page.goto(url, { timeout: 120000 });
    // lighthouse
    const runnerResult = await lighthouse(url, LIGHTHOUSE_FALGS, LIGHTHOUSE_CONFIG, page);
    const html = (Array.isArray(runnerResult?.report)
        ? runnerResult?.report[0]
        : runnerResult?.report) ?? '';
    console.log('分数：', (runnerResult?.lhr.categories.performance.score ?? 0) * 100);
    // 发送邮件
    if (email) {
        const emailPage = await browser.newPage();
        await emailPage.setContent(html.replace(/<noscript.*?<\/noscript>/g, ''), {
            waitUntil: 'networkidle0',
        });
        const emailHtml = await emailPage.content();
        await outputHtml(emailHtml);
        await sendEmail(email, url, emailHtml);
    }
    // await browser.close()
    // 生成html
    if (isGenerateHtml) {
        await outputHtml(html);
    }
    // 启动html服务
    if (isOpenServe) {
        createServe(parseInt(port));
    }
}
