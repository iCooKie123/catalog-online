import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@/components": path.resolve(__dirname, "./src/components"),
			"@/contexts": path.resolve(__dirname, "./src/contexts"),
			"@/pages": path.resolve(__dirname, "./src/pages"),
			"@/models": path.resolve(__dirname, "./src/models"),
			"@/utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
