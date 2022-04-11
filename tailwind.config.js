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
          500: '#50547C',
          600: '#404164'
        },
        teal: {
          550: '#29A3A1',
          650: '#259391',
          750: '#218381'
        }
      },
      screens: {
        'sm': '475px',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-150%)' },
          '50%': { transform: 'translateX(-60%)' },
          '100%': { transform: 'translateX(+100%)' },
        },
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    }, 
    
    fontFamily: {
      'sans': ['Inter']
    }
  },
  plugins: [],
}