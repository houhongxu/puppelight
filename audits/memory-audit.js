import { Audit } from "lighthouse";

const MAX_MEMORY_USAGE = 1_000_000;

class MemoryAudit extends Audit {
  static get meta() {
    return {
      id: "memory-audit",
      title: "Did not find any large memory usage",
      failureTitle: "Found large memory usage",
      description: "Detects if any memory sample was larger than 1 MB",
      requiredArtifacts: ["MemoryProfile"],
    };
  }
  static audit(artifacts) {
    let largestMemoryUsage = 0;
    for (const sample of artifacts.MemoryProfile.samples) {
      if (sample.total > largestMemoryUsage) {
        largestMemoryUsage = sample.total;
      }
    }
    return {
      numericValue: largestMemoryUsage,
      score: largestMemoryUsage > MAX_MEMORY_USAGE ? 0 : 1,
    };
  }
}

export default MemoryAudit;
