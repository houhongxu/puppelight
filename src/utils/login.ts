export default async function login(page, url: string) {
  const loginButton = ".login-JeEm8";
  const accountInput = "#basic_account";
  const passwordInput = "#basic_pwd";
  const ensureLogin = ".wbc-btn";
  const avatar = ".ant-space-item";
  await page.goto(url);
  await page.waitForSelector(loginButton);
  await page.click(loginButton);
  await page.waitForSelector(accountInput);
  await page.type(accountInput, process.env.account);
  await page.type(passwordInput, process.env.password);
  await page.click(ensureLogin);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return "sucess login";
}
