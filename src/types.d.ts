interface PluginConfig {
  dev?: boolean;
  suffixes?: Array<'html' | 'svelte' | 'jsx' | 'tsx' | 'vue'>;
  selectors?: string[];
}
