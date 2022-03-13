module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#F3F3F7',
          300: '#6A70A0',
          400: '#585D89',
          500: '#50547C'
        },
        teal: {
          550: '#29A3A1',
          650: '#259391'
        }
      }
    }, 
    fontFamily: {
      'sans': ['Inter']
    }
  },
  plugins: [],
}