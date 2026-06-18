module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#003087',
          dark: '#0A1628',
          light: '#0046C0'
        },
        gold: {
          DEFAULT: '#F5A623',
          light: '#FFD700'
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        lift: '0 10px 25px rgba(0,48,135,0.12)',
        panel: '0 25px 50px rgba(0,0,0,0.25)'
      }
    }
  },
  plugins: []
}
