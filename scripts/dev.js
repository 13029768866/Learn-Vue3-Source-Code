const { build } = require("esbuild");
const { resolve } = require("path");

// 打包文件
const target = "reactivity";

build({
  // 打包入口文件
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  // 出口文件
  outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
  // 是否打包依赖模块
  bundle: true,
  // 源码映射
  sourcemap: true,
  // 打包类型
  format: "esm",
  // 运行平台
  platform: "browser",
  // 监听钩子
  watch: {
    onRebuild() {
      console.log("重新构建~~~");
    },
  },
}).then(() => {
  console.log("正在监听~~~");
});
