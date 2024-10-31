import { ROOT_PATH } from './config.js'
import { run } from './run.js'
import { program } from 'commander'
import { config } from 'dotenv'
import fs from 'fs/promises'
import path from 'path'

// env
config()

// 作者推荐以单文件组织cli https://github.com/tj/commander.js/issues/983

const packageJson = await fs.readFile(
  path.join(ROOT_PATH, 'package.json'),
  'utf-8',
)
const { version } = JSON.parse(packageJson) as { version: string }

export const cli = program

cli.name('puppelight').version(version)

cli
  .command('run <url>', { isDefault: true })
  .description('run puppelight') // 单独使用description才使命令参数生效
  .option('-h,--html', 'output html')
  .option('-e,--email <value>', 'send email')
  .option('-s,--serve', 'serve html')
  .option('-p,--port <value>', 'serve port')
  .option('-H,--head', 'head')
  .option('-S,--smtp <value>', 'email:password')
  .action((url, { html, serve, port, email, head, smtp }) => {
    run({
      url,
      port: port as string,
      isGenerateHtml: html,
      isOpenServe: serve,
      email,
      isHeadless: !head,
      smtp,
    })
  })

cli.parse()
