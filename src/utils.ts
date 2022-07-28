const getRegexps = (selectors: string[]) => {
  const arr: RegExp[] = [];
  selectors.forEach((selector) => {
    // <Element data-test-id="something" /> or <Element data-test-header />
    arr.push(
      new RegExp(`(?:\\s)+${selector}-(?:.{1,}?[\\s=])(?:(?:["'].*?["'])*|.*?(?=[\\s/>]))`, 'm')
    );
    // attr_dev(element, 'data-test-id', 'something');
    arr.push(
      new RegExp(
        `^.*attr_dev.*?["']${selector}-(?:.+?)["'],(?:\\s)*(?:(?:["'].*\\w["'])|(?:.*\\w)).*$(?:\\n{0,1})`,
        'm'
      )
    );
    // ...{ props: 'something', 'data-test-id', 'something' | boolean }...
    arr.push(new RegExp(`,{0,1}\\s*?["']${selector}-(?:.+?)["'](?::\\s{0,1}(?:.*\\w))`, 'm'));
  });

  return arr;
};

export const endsWith = (id: string, suffixes: string[] = []) => {
  return suffixes.some(function (suffix) {
    return id.endsWith(suffix);
  });
};

export const stripSelectors = (code: string, selectors: string[] = []) => {
  const regexeps = getRegexps(selectors);
  regexeps.forEach((regexp) => {
    let match: RegExpMatchArray | null;
    while ((match = regexp.exec(code)) !== null) {
      code = code.replace(match[0], '');
    }
  });
  return code;
};
