import { SendMailOptions, createTransport } from 'nodemailer'

export async function sendEmail(email?: string, html?: string, smtp?: string) {
  const [smtpEmail, smtpPassword] = smtp?.split(':') ?? []

  if (!process.env.SMTP_EMAIL && !smtpEmail) {
    console.error('缺少SMTP_EMAIL')
  }

  if (!process.env.SMTP_PASSWORD && !smtpPassword) {
    console.error('缺少SMTP_PASSWORD')
  }

  const transporter = createTransport({
    host: 'smtp.qq.com', // QQ 邮箱的 SMTP 服务器
    port: 465, // 端口号（SSL）
    secure: true, // 使用 SSL 加密
    auth: {
      user: process.env.SMTP_EMAIL ?? smtpEmail, // QQ 邮箱
      pass: process.env.SMTP_PASSWORD ?? smtpPassword, // 授权码（非邮箱密码）
    },
  })

  const mailOptions: SendMailOptions = {
    from: process.env.SMTP_EMAIL, // 发件人邮箱
    to: email ?? process.env.SMTP_EMAIL, // 收件人邮箱
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
