const getRegexps = (type: string, selectors: string[]) => {
  const arr: RegExp[] = [];
  selectors.forEach((selector) => {
    switch (type) {
      case 'html':
        arr.push(
          new RegExp(
            `(?:\\s)+${selector}-(?:.*?(?:=|(?=\\s)))(?:(?:["'].*?["'])*|.*?(?=[\\s\\n/>]))`,
            'm'
          )
        );
        break;
      case 'svelte':
        arr.push(
          new RegExp(
            `^.*attr_dev.*?["']${selector}-(?:.+?)["'],(?:\\s)*(?:(?:["'](?:.*?\\w){0,1}["'])|(?:.*\\w)).*$(?:\\n{0,1})`,
            'm'
          )
        );
        arr.push(new RegExp(`,{0,1}\\s*?["']${selector}-(?:.+?)["'](?::\\s{0,1}(?:.*\\w))`, 'm'));
        break;
      case 'jsx':
      case 'tsx':
        arr.push(
          new RegExp(
            `^.*?["']${selector}-(?:.*?["']):\\s*?(?:(?:true)|(?:["'].*?["'])),{0,1}\\s*?$\\n{0,1}`,
            'm'
          )
        );
        break;
      case 'vue':
        arr.push(
          new RegExp(
            `(?:\\s)+${selector}-(?:.*?(?:=|(?=\\s)))(?:(?:["'].*?["'])*|.*?(?=[\\s\\n/>]))`,
            'm'
          )
        );
        break;
    }
  });
  return arr;
};

const getFiletype = (id: string) => {
  const res = id.match(new RegExp('[^\\.]+$'));
  return res ? res[0] : '';
};

export const endsWith = (id: string, suffixes: string[] = []) => {
  return suffixes.some((suffix) => {
    return id.endsWith(suffix);
  });
};

export const stripSelectors = (id: string, code: string, selectors: string[] = []) => {
  const type = getFiletype(id);
  const regexeps = getRegexps(type, selectors);
  regexeps &&
    regexeps.forEach((regexp) => {
      let match: RegExpMatchArray | null;
      while ((match = regexp.exec(code)) !== null) {
        code = code.replace(match[0], '');
      }
    });
  return code;
};
