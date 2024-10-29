declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    SSLPORT: number
    SSLURL: string
    QQEMAIL: string
    SMTP: string
    [key: string]: string | number // 允许扩展更多自定义环境变量
  }
}
