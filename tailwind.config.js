/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#020D6A',
        customPink:"rgb(252, 238, 192)",
      },
      fontFamily: {
        'inter': ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'times': ['Times New Roman', 'Times', 'serif'],
      },
    },
    
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
  
  },
  plugins: [],
}

