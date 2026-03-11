import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/vue3-vite',
  async viteFinal(config) {
    const projectRoot = fileURLToPath(new URL('../', import.meta.url))
    const variablesPath = fileURLToPath(
      new URL('../app/assets/styles/_variables.scss', import.meta.url),
    ).replaceAll('\\', '/')

    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': projectRoot,
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "${variablesPath}" as *;`,
          },
        },
      },
    });
  }
}

export default config
