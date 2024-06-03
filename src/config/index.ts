export default {
  extends: "lighthouse:default",
  audits: [ 'audits/memory-audit' ],
  artifacts: [{ id: 'MemoryProfile', gatherer: 'gathers/memory-gather' }],
  categories: {
    goodwe: {
      title: "固德威",
      description: "固德威自定义",
      supportedModes: ['navigation', 'snapshot'],
      auditRefs: [{ id: 'memory-audit', weight: 1 }],
    },
  },
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'goodwe'],
  },
};
