import { writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Writes JSON to the filesystem.
 * @module writeJson
 * @param {string} filename name and extension of the file to be written
 * @param {Object} json any valid JSON statement. Ideally object literals or arrays
 * @param {Object} config configuration object
 * @param {function} config.errorCallback Calls if files write fails
 * @param {boolean} config.willFormat Determines whether to add tab formatting to file
 * @param {string} config.root File path to write to. Defaults to cwd.
 * @param {Object} config.writeOptions Node options for `writeFile`, etc.
 *
 */
const writeJson = (filename, json, config = {}) => {
  if (typeof filename !== 'string') {
    throw 'No filename specified.';
  }

  const { errorCallback, willFormat, root, writeOptions } = Object.assign(
    {
      errorCallback: null,
      willFormat: true,
      root: resolve(),
      writeOptions: { flag: 'w' },
    },
    config
  );

  const spacer = willFormat ? '\t' : null;
  const strung = JSON.stringify(json, null, spacer);
  const dest = resolve(root, filename);

  try {
    writeFileSync(dest, strung, writeOptions);
  } catch (err) {
    if (typeof errorCallback === 'function') {
      errorCallback(err);
    }
  }
};

export default writeJson;
