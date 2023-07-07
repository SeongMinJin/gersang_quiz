/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'helvetica': "'helvetica Neue', sans-serif",
        'trial-oceanic': "'Trial Oceanic', sans-serif",
        'noto-serif-kr': "'Noto Serif KR', serif",
        'noto-sans-kr': "'Noto Sans KR', sans-serif",
      },
    },
  },
  plugins: [],
}
