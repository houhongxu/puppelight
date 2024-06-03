import fs from "fs";
import path from "path";
const dirname = path.resolve();
const dir = path.join(dirname, "publish");

function getReportName() {
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth();
  const D = now.getDate();
  const H = now.getHours();
  const m = now.getMinutes();
  return `report@${Y}-${
    M + 1 < 10 ? "0" + (M + 1) : M + 1
  }-${D}-${H}-${m}.html`;
}

export default async function generateReport(runnerResult, env: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filename = env + "_" + getReportName();
  const htmlReportPath = path.join(dir, filename);
  const htmlContent = runnerResult.report;
  fs.writeFileSync(htmlReportPath, htmlContent);
  return htmlReportPath;
}
