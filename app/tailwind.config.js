module.exports = {
  mode: 'jit',
  darkMode: false, // 'media' or 'class',
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [],
  theme: {
    extend: {
      fontFamily: {
        fancy: ['Dancing Script'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0px 2px 3px #808080',
        },
        '.text-shadow-md': {
          textShadow: '0px 3px 3px #808080',
        },
        '.text-shadow-lg': {
          textShadow: '0px 5px 3px #808080',
        },
        '.text-shadow-xl': {
          textShadow: '0px 7px 3px #808080',
        },
        '.text-shadow-2xl': {
          textShadow: '0px 10px 3px #808080',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }

      addUtilities(newUtilities)
    },
  ],
}
