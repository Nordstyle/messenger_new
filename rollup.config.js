import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import analyze from 'rollup-plugin-analyzer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      exports: 'named',
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      exports: 'named',
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      name: 'Messenger',
      file: packageJson.unpkg,
      format: 'umd',
      globals: {
        react: 'React',
      },
    },
  ],
  plugins: [
    resolve({ preferBuiltins: true, mainFields: ['browser'] }),
    peerDepsExternal(),
    url(),
    svgr(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    analyze(),
  ],
  external: ['react'],
};
