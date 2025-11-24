import { defineConfig, presetWind4, presetAttributify } from "unocss";

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify({ /* preset options */}),
  ],
  theme: {
    colors: {
      primary: {
        50:  "#e8fff8",
        100: "#c4eadf",
        200: "#9cd5cb",
        300: "#66c4b0",
        400: "#00a08b",
        500: "#007f79",
        600: "#006b67",
        700: "#005754",
        800: "#004341",
        900: "#002f2e",
        950: "#051b2a",
      },
      // primary: "#007f79",
      // "primary-dark": "#051b2a",
      // "primary-light": "#9cd5cb",
      secondary: {
        300: "#ffb845ff",
        400: "#ee9725ff",
        500: "#dd831cff"
      }
      // secondary: "#f3a639",
    }
  },
  preflights: [
    {
      getCSS: ({ theme }) => `
        :root {
          --color-primary-50: ${theme.colors.primary["50"]};
          --color-primary-100: ${theme.colors.primary["100"]};
          --color-primary-200: ${theme.colors.primary["200"]};
          --color-primary-300: ${theme.colors.primary["300"]};
          --color-primary-400: ${theme.colors.primary["400"]};
          --color-primary-500: ${theme.colors.primary["500"]};
          --color-primary-600: ${theme.colors.primary["600"]};
          --color-primary-700: ${theme.colors.primary["700"]};
          --color-primary-800: ${theme.colors.primary["800"]};
          --color-primary-900: ${theme.colors.primary["900"]};
          --color-primary-950: ${theme.colors.primary["950"]};
          --color-secondary-300: ${theme.colors.secondary["300"]};
          --color-secondary-400: ${theme.colors.secondary["400"]};
          --color-secondary-500: ${theme.colors.secondary["500"]};
        }
      `,
    },
  ],
});
