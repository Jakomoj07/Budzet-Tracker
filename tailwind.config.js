/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        budzet: {
          page:'#F5F0E8', card:'#FFFFFF',
          tableHeader:'#D4C4A8', rowAlt:'#FDFAF5',
          accent:'#C4A882', accentDark:'#8B7355',
          textPrimary:'#3D2B1F', textMuted:'#8B7355',
          textHeader:'#5C4A2A', border:'#E8DFD0',
          positive:'#6B8F5E', negative:'#B85C4A',
        },
      },
    },
  },
  plugins: [],
}
