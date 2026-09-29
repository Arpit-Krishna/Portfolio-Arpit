// Theme metadata. Palettes live in src/themes.css; `swatch` values feed the picker
// and `graph` is the hex colour passed to the GitHub contribution chart.
export const themes = [
  { id: "terminal", label: "Terminal", note: "Emerald on graphite", swatch: ["#0b0b0d", "#5fd4a0"], graph: "5fd4a0", meta: "#0b0b0d" },
  { id: "amber", label: "Amber CRT", note: "Phosphor glow, scanlines", swatch: ["#0e0b08", "#eca84a"], graph: "eca84a", meta: "#0e0b08" },
  { id: "ocean", label: "Deep Ocean", note: "Navy and electric blue", swatch: ["#070b14", "#6eaafa"], graph: "6eaafa", meta: "#070b14" },
  { id: "paper", label: "Paper", note: "Light, warm and calm", swatch: ["#f7f6f2", "#0e7854"], graph: "0e7854", meta: "#f7f6f2" },
];

export const defaultTheme = "terminal";
