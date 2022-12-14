import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const extensions = [".js"];

const resolve = (...args) => path.resolve(...args);

const config = [
  {
    input: resolve('./src/run.js'),
    output: [
      {
        file: resolve('./', pkg.module),
        format: 'es',
        name: 'starter',
      },
      {
        file: resolve('./', pkg.main),
        format: 'cjs',
        name: 'starter',
      },
    ],
    plugins: [
      commonjs(),
      babel({
        extensions,
        exclude: 'node_modules/**',
      }),
      nodeResolve({
        extensions,
      }),
    ],
    external: [/node_modules/],
  },
];

export default config;
