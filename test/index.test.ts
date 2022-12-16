import { describe, it, expect } from 'vitest';
import { getFiletype, getRegexps, endsWith } from '@/utils';
import stripSelectors from '@/transform';
import fs from 'fs';

describe('Util | getFiletype', () => {
  it('should correctly parse filenames', async () => {
    const extentions = ['js', 'jsx', 'ts', 'tsx', 'vue', 'svelte', 'html'];

    // Parse 'normal' filenames
    ['test.js', 'test.jsx', 'test.ts', 'test.tsx', 'test.vue', 'test.svelte', 'test.html'].forEach(
      (filename, index) => {
        const filetype = getFiletype(filename);
        expect(filetype).toBe(extentions[index]);
      }
    );

    // Parse filenames with underscores / dashes
    [
      'test_test.js',
      'test-test.jsx',
      '_test_test.ts',
      'test-test-.tsx',
      'test_test.vue',
      'test-_-test.svelte',
      'test_test__.html'
    ].forEach((filename, index) => {
      const filetype = getFiletype(filename);
      expect(filetype).toBe(extentions[index]);
    });

    // Parse filenames with other dots
    [
      'test.test.js',
      'test.test.jsx',
      'test.test.ts',
      'test.test.tsx',
      'test.test.vue',
      'test.test.svelte',
      'test.test.html'
    ].forEach((filename, index) => {
      const filetype = getFiletype(filename);
      expect(filetype).toBe(extentions[index]);
    });
  });
});

describe('Utils | getRegexps', () => {
  it('should return regexps for supported filetypes', async () => {
    const supported = ['jsx', 'tsx', 'vue', 'svelte', 'html'];
    const unsupported = ['js', 'css', 'scss', 'null', ''];

    supported.forEach((type) => {
      const regexps = getRegexps(type, ['data-test']);
      expect(regexps).toBeDefined();
      expect(regexps.length).toBeGreaterThanOrEqual(1);
    });

    unsupported.forEach((type) => {
      const regexps = getRegexps(type, ['data-test']);
      expect(regexps).toStrictEqual([]);
    });
  });
});

describe('Utils | endsWith', () => {
  it('should correctly determine if a filepath ends with a certain suffix', async () => {
    [
      '/home/kio/someDirectory/someProject/src/components/component.tsx',
      'C:\\home\\kio\\someDirectory\\someProject\\src\\components\\component.tsx',
      '/home/kio/someDirectory/someProject/src/components/component.something.tsx',
      'C:\\home\\kio\\someDirectory\\someProject\\src\\components\\component.something.tsx'
    ].forEach((file) => expect(endsWith(file, ['.tsx'])).toBe(true));
  });
});

describe('Transforms | stripSelectors', () => {
  it('should not transform code without selectors', async () => {
    const code = fs.readFileSync('./test/code/tsx.txt').toString();
    expect(code).toBeDefined();

    const transformed = stripSelectors('/somePath/component.tsx', code, []);
    expect(transformed).toBeDefined();
    expect(transformed).toBe(code);
  });

  it('should correctly transform code with selectors', async () => {
    let code: string | undefined = fs.readFileSync('./test/code/tsx.txt')?.toString();
    expect(code).toBeDefined();

    let transformed: string | undefined = stripSelectors('/somePath/component.tsx', code, [
      'data-test'
    ]);
    expect(transformed).toBeDefined();
    expect(transformed).not.toBe(code);
    // should not contain the selector
    expect(transformed.match(new RegExp('data-test-\\w+', 'm'))).toBeNull;
    // should remove expected length
    expect(transformed.length).toEqual(2492);
    transformed = undefined;
    code = undefined;

    code = fs.readFileSync('./test/code/svelte.txt')?.toString();
    expect(code).toBeDefined();

    transformed = stripSelectors('/somePath/component.svelte', code, ['data-test']);
    expect(transformed).toBeDefined();
    expect(transformed).not.toBe(code);
    expect(transformed.match(new RegExp('data-test-\\w+', 'm'))).toBeNull;
    expect(transformed.length).toEqual(2262);
    transformed = undefined;
    code = undefined;

    code = fs.readFileSync('./test/code/vue.txt')?.toString();
    expect(code).toBeDefined();

    transformed = stripSelectors('/somePath/component.vue', code, ['data-test']);
    expect(transformed).toBeDefined();
    expect(transformed).not.toBe(code);
    expect(transformed.match(new RegExp('data-test-\\w+', 'm'))).toBeNull;
    expect(transformed.length).toBeGreaterThanOrEqual(750);
  });

  it('ignores invalid selectors while still transforming code with valid ones', async () => {
    const code: string = fs.readFileSync('./test/code/tsx.txt').toString();
    expect(code).toBeDefined();

    const transformed = stripSelectors('/somePath/component.tsx', code, [
      'data-test',
      'some-<>-invalid selector {} []',
      '.*?<.*'
    ]);
    expect(transformed).toBeDefined();
    expect(transformed).not.toBe(code);
    expect(transformed.match(new RegExp('data-test-\\w+', 'm'))).toBeNull;
    expect(transformed.length).toEqual(2492);
  });
});
