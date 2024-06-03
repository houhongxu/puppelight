#!/usr/bin/env node

// src/index.ts
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import dotenv from "dotenv";
import { URL } from "url";

// src/config/index.ts
var config_default = {
  extends: "lighthouse:default",
  audits: ["audits/memory-audit"],
  artifacts: [{ id: "MemoryProfile", gatherer: "gathers/memory-gather" }],
  categories: {
    goodwe: {
      title: "\u56FA\u5FB7\u5A01",
      description: "\u56FA\u5FB7\u5A01\u81EA\u5B9A\u4E49",
      supportedModes: ["navigation", "snapshot"],
      auditRefs: [{ id: "memory-audit", weight: 1 }]
    }
  },
  settings: {
    onlyCategories: ["performance", "accessibility", "best-practices", "goodwe"]
  }
};

// src/utils/login.ts
async function login(page, url) {
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

// src/utils/generate.ts
import fs from "fs";
import path from "path";
var dirname = path.resolve();
var dir = path.join(dirname, "publish");
function getReportName() {
  const now = /* @__PURE__ */ new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  return `report@${Y}-${M + 1 < 10 ? "0" + (M + 1) : M + 1}-${D}-${H}-${m}.html`;
}
async function generateReport(runnerResult, env2) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filename = env2 + "_" + getReportName();
  const htmlReportPath = path.join(dir, filename);
  const htmlContent = runnerResult.report;
  fs.writeFileSync(htmlReportPath, htmlContent);
  return htmlReportPath;
}

// src/index.ts
import path2 from "path";
var args = process.argv.slice(2);
var env = args[0] || "test";
var envFilePath = `envs/.env.${env}`;
dotenv.config({ path: path2.resolve(process.cwd(), envFilePath) });
async function start() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await login(page, `${process.env.loginPage}#${process.env.loginRoute}`);
  await page.goto(`${process.env.homePage}#${process.env.homeRoute}`);
  const runnerResult = await lighthouse(
    page.url(),
    {
      port: +new URL(browser.wsEndpoint()).port,
      output: "html",
      logLevel: "info",
      locale: "zh",
      screenEmulation: { disabled: true }
    },
    config_default,
    page
  );
  await generateReport(runnerResult, env);
  await browser.close();
}
start();
