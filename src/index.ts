import { endsWith } from '@/utils';
import stripSelectors from '@/transform';
import type { Plugin } from 'vite';

const defaultSuffixes = ['jsx', 'tsx', 'vue', 'svelte'] as PluginConfig['suffixes'],
  defaultSelectors = ['data-test'];

export default function StripTestSelectors(config: PluginConfig = {}): Plugin {
  config.suffixes = config.suffixes || defaultSuffixes;
  config.selectors = config.selectors || defaultSelectors;

  const plugin: Plugin = {
    name: 'strip-test-selectors',
    apply: config.dev === true ? 'serve' : 'build',
    enforce: 'pre',
    transform(src, id) {
      if (endsWith(id, config.suffixes)) {
        return {
          code: stripSelectors(id, src, config.selectors),
          map: null
        };
      }
    }
  };

  return plugin;
}
