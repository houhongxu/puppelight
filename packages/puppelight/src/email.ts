import { SendMailOptions, createTransport } from 'nodemailer'

export async function sendEmail(email?: string, url?: string, html?: string) {
  const transporter = createTransport({
    host: process.env.SSLURL, // QQ 邮箱的 SMTP 服务器
    port: process.env.SSLPORT, // 端口号（SSL）
    secure: true, // 使用 SSL 加密

    // service: 'qq',
    // secure: true,

    auth: {
      user: process.env.QQEMAIL, // QQ 邮箱
      pass: process.env.SMTP, // 授权码（非邮箱密码）
    },
  })

  const mailOptions: SendMailOptions = {
    from: process.env.QQEMAIL, // 发件人邮箱
    to: email ?? process.env.QQEMAIL, // 收件人邮箱
    subject: '网站性能测试', // 邮件主题
    html:
      html ??
      '<h1>QQ 邮箱测试邮件</h1><p>这是 <strong>HTML 格式</strong> 的邮件内容。</p>',
  }

  try {
    const info = await transporter.sendMail(mailOptions)

    console.log('邮件发送成功:', info.response)
  } catch (error) {
    console.error('邮件发送失败:', error)
  }
}
