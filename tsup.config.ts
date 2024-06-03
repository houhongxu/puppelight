// tsup.config.ts
export default {
  entry: ["src/index.ts"],
  outDir: "dist",
  splitting: false, // 启用代码分割
  clean: true, // 清理输出目录
  sourcemap: false, // 生成源码映射文件
  format: ["esm"], // 输出格式
  dts: false, // 生成类型声明文件
  minify: false, // 压缩输出代码
};
