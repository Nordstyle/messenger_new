import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import url from "@rollup/plugin-url";
import analyze from "rollup-plugin-analyzer";
import svg from "rollup-plugin-svg-import";

import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions,
      dedupe: ["react", "react-dom"],
    }),
    url(),
    svg({
      stringify: false,
    }),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    analyze(),
    external(),
  ],
};
