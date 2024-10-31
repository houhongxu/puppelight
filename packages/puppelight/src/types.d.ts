declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SMTP_EMAIL?: string
    SMTP_PASSWORD?: string
    [key: string]: string // 允许扩展更多自定义环境变量
  }
}
