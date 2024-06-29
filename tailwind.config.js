/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '200': '50rem', // Adjust as needed for your specific height
      },
      fontSize: {
        '50px': '50px',
      },
      
      colors: {
        customBlue: '#020D6A',
        customPink:"rgb(252, 238, 192)",
        customRed:"rgb(255, 0, 0)",
        customVoilet:"#4c1d95",
        customYellow:"rgb(255, 255, 0)",
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

