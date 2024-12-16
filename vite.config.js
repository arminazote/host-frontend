// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://jsgame.live",
//         changeOrigin: true,
//         secure: true, // true if the target uses HTTPS
//         rewrite: (path) => path.replace(/^\/api/, ""), // Remove the /api prefix
//       },
//     },
//   },
// });

// for production mode only
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// for remotely accessible
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
