module.exports = {
  important: true,
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
        },
        blue: {
          100: '#E5EEF6',
          200: '#DCF1FC',
          300: '#CFD9E3',
          400: '#9EB3CC',
          500: '#16A1EB',
        },
        green: {
          400: '#00B294',
        },
        error: '#EF4444',
      },
    }
  },
};
