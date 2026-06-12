/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#001B3D",
        smoky: "rgba(128, 128, 128, 0.5)",
        gold: "#FFD700",
        skyblue: "#00BFFF",
      },
      backgroundImage: {
        'cinematic-gradient': 'linear-gradient(to bottom, transparent 0%, rgba(0, 27, 61, 0.8) 70%, #001B3D 100%)',
      }
    },
  },
  plugins: [],
}
