#!/usr/bin/env node

const args = process.argv.slice(2)
const url = args?.[0]

import('../lib/index.js').then((module) => {
  if (url) {
    module.default(url)
  } else {
    throw Error('请在命令行传入url')
  }
})
