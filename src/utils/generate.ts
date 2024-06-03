import fs from "fs";
import path from "path";
const dirname = path.resolve();
const dir = path.join(dirname, "publish");

export default async function generateReport(runnerResult, filename: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const htmlReportPath = path.join(dir, filename);
  const htmlContent = runnerResult.report;
  fs.writeFileSync(htmlReportPath, htmlContent);
  return htmlReportPath;
}
