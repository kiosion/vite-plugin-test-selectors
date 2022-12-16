import { getFiletype, getRegexps } from '@/utils';

const stripSelectors = (id: string, code: string, selectors: string[] = []) => {
  selectors.forEach((selector) => {
    // Strip any illegal chars from selector
    while (selector.match(/[^a-zA-Z0-9-_]/)) {
      selector = selector.replace(/[^a-zA-Z0-9-_]/, '');
    }
  });
  const type = getFiletype(id),
    regexeps = getRegexps(type, selectors);
  regexeps?.forEach((regexp) => {
    let maybeMatch: RegExpMatchArray | null;
    while ((maybeMatch = regexp.exec(code)) !== null) {
      code = code.replace(maybeMatch[0], '');
    }
  });
  return code;
};

export default stripSelectors;
