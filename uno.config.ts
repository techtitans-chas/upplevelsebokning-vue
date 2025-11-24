import { defineConfig, presetWind4, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify({ /* preset options */}),
  ],
  theme: {
    colors: {
      primary: "#007f79",
      "primary-dark": "#051b2a",
      "primary-light": "#9cd5cb",
      secondary: "#f3a639ff",
    }
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        :root {
          --color-primary: ${theme.colors.primary};
          --color-primary-dark: ${theme.colors["primary-dark"]};
          --color-primary-light: ${theme.colors["primary-light"]};
          --color-secondary: ${theme.colors.secondary};
        }
      `,
    },
  ],
});
