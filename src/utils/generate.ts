import fs from "fs";
import path from "path";
const dirname = path.resolve();
export default async function generateReport(runnerResult, filename: string) {
  const htmlReportPath = path.join(dirname, "publish", filename);
  const htmlContent = runnerResult.report;
  fs.writeFileSync(htmlReportPath, htmlContent);
  return htmlReportPath;
}
