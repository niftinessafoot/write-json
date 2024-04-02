export default {
  external: ['fs', 'path'],
  input: './src/index.js',
  output: [
    {
      // Transpiled IIFE/CJS (UMD)
      // Bundle-ready. Assumed will be transpiled on future builds.
      file: 'dist/umd/index.js',
      format: 'umd',
      globals: { fs: 'fs', path: 'path' },
      name: 'write-json',
      plugins: [],
    },
    {
      // Transpiled JS module (ESM)
      // Bundle-ready. Assumed will be transpiled on future builds.
      file: 'dist/esm/index.js',
      format: 'esm',
      globals: { fs: 'fs', path: 'path' },
      plugins: [],
    },
  ],
};
