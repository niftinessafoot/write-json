import { jest } from '@jest/globals';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';

jest.unstable_mockModule('fs', () => {
  return {
    writeFileSync: jest.fn(() => null),
  };
});

const { writeFileSync } = await import('fs');
const { default: writeJson } = await import('../src/index.js');

describe('writeJson', () => {
  const expected = readFileSync('./__tests__/example.package.json', 'utf8');

  let input;
  let filename;
  let filepath;
  let options;

  beforeEach(() => {
    input = {
      name: 'test',
      description: '',
      version: '0.0.0',
      keywords: ['javascript', 'module'],
      scripts: {
        test: 'echo `test`',
      },
      devDependencies: {},
      files: [],
    };

    filename = 'test.json';
    filepath = join(resolve(), filename);
    options = { flag: 'w' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should output formatted JSON', async () => {
    writeJson(filename, input);

    expect(writeFileSync).toBeCalledWith(filepath, expected, options);
  });

  describe('output variations', () => {
    const config = { willFormat: false };

    it('should accept arrays', async () => {
      writeJson(filename, [0, 1, 2], config);

      expect(writeFileSync).toBeCalledWith(filepath, '[0,1,2]', options);
    });

    it('should accept strings', async () => {
      writeJson(filename, 'abcde', config);

      expect(writeFileSync).toBeCalledWith(filepath, '"abcde"', options);
    });

    it('should accept undefined', async () => {
      writeJson(filename, undefined, config);

      expect(writeFileSync).toBeCalledWith(filepath, undefined, options);
    });
  });

  describe('config options', () => {
    it('should not format output if `willFormat` is false', () => {
      input = { name: 'foo' };

      writeJson(filename, input, { willFormat: false });

      expect(writeFileSync).toBeCalledWith(
        filepath,
        JSON.stringify(input),
        options
      );
    });

    it('should write to the folder specified in `root`', () => {
      const root = '/foo/bar';

      writeJson(filename, input, { root });

      expect(writeFileSync).toBeCalledWith(
        `${root}/${filename}`,
        expected,
        options
      );
    });
  });

  describe('write errors', () => {
    const errorMessage = 'write error';

    it('should run an error callback on write error', async () => {
      const errorCallback = jest.fn((err) => err);

      writeFileSync.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      writeJson(filename, input, { errorCallback });

      expect(errorCallback).toHaveReturnedWith(new Error(errorMessage));
    });

    it('should remain silent if no error callback given', async () => {
      writeFileSync.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      const output = () => {
        writeJson(filename, input);
      };

      expect(output).not.toThrow();
    });
  });

  it('should throw if no filename given', async () => {
    const output = () => {
      writeJson();
    };

    expect(output).toThrow('No filename specified.');
  });
});
