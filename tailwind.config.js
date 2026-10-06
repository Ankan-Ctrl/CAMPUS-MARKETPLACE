/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F6EE',
        surface: '#FFFFFF',
        ink: '#20301C',
        accent: {
          DEFAULT: '#5F7A1F',
          deep: '#48590F',
          soft: '#BCC6E4',
        },
        hairline: '#DCDCC8',
        danger: '#A8412E',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['Karla', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}
