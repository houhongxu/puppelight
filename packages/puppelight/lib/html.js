import { ROOT_PATH } from './config.js';
import fs from 'fs/promises';
export async function outputHtml(html) {
    await fs.writeFile(ROOT_PATH + '/index.html', html);
    console.log('生成成功', ROOT_PATH + '/index.html');
}
export async function generatePureHtml(html, browser) {
    // 生成纯html
    const purePage = await browser.newPage();
    await purePage.setContent(html.replace(/<noscript.*?<\/noscript>/g, ''), {
        waitUntil: 'networkidle0',
    });
    const pureHtml = await purePage.content();
    return pureHtml;
}
