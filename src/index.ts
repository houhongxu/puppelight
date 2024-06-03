#!/usr/bin/env node
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import dotenv from "dotenv";
import { URL } from "url";
import customConfig from "./config";
import { login, generateReport } from "./utils";
const args = process.argv.slice(2);
const env = args[0] || "test";
// const env = process.env.NODE_ENV || "test";
import path from "path";
const envFilePath = `envs/.env.${env}`;
dotenv.config({ path: path.resolve(process.cwd(), envFilePath) });

async function start() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      '--ignore-certificate-errors', 
    ]
  });
  const page = await browser.newPage();
  await login(page, `${process.env.loginPage}#${process.env.loginRoute}`);
  await page.goto(`${process.env.homePage}#${process.env.homeRoute}`);
  const runnerResult = await lighthouse(
    page.url(),
    {
      port: +(new URL(browser.wsEndpoint())).port,
      output: "html",
      logLevel: "info",
      locale: "zh",
      screenEmulation: { disabled: true },
    },
    customConfig,
    page
  );
  await generateReport(runnerResult, env);
  await browser.close();
}
start();
