import { run } from './run.js';
import { program } from 'commander';
import { config } from 'dotenv';
// env
config();
// 作者推荐以单文件组织cli https://github.com/tj/commander.js/issues/983
const { default: { version } } = await import('../package.json', { assert: { type: 'json' } });
export const cli = program;
cli.name('puppelight').version(version);
cli
    .command('run <url>', { isDefault: true })
    .description('run puppelight') // 单独使用description才使命令参数生效
    .option('-h,--html', 'output html')
    .option('-e,--email <value>', 'send email')
    .option('-s,--serve', 'serve html')
    .option('-p,--port <value>', 'serve port')
    .option('-H,--head', 'head')
    .action((url, { html, serve, port, email, head }) => {
    run({ url, port: port, isGenerateHtml: html, isOpenServe: serve, email, isHeadless: !head });
});
cli.parse();
