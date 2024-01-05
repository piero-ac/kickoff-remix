import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				cyan: "#04f5ff",
				hotpink: "#e90052",
				brightwhite: "#ffffff",
				limegreen: "#00ff85",
				darkpurple: "#38003c",
			},
		},
	},
	plugins: [],
} satisfies Config;
