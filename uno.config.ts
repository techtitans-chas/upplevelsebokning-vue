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
  }
});
