/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {   
      colors: {
      'primary':{
        50:'#F9F5FF',
        100:'#F4EBFF',
        600:'#7F56D9',
        700:'#6941C6'
      },
      'gray':{
        100:'#F2F4F7',
        200:'#EAECF0',
        300:'#D0D5DD',
        400:'#98A2B3',
        600:'#475467',
        700:'#344054',
        900:'#101828',
      },
      'white':'#FFFFFF',
      'sucess':{
        50:'#ECFDF3',
        100:'#D1FADF',
        500:'#12B76A',
        600:'#039855',
        700:'#027A48',
      },
      'error':{
        50:'#FEF3F2',
        500:'#F04438',
        700:'#B42318',
      },
       },
      // fontFamily: {
      //   sans: ['Inter var', ...fontFamily.sans],
      //   mono: ['Roboto Mono', ...fontFamily.mono],
      //   syne: ['syne', 'sans-serif'],
      //   syneBold: ['syneBold', 'sans-serif'],
      //   syneRegular: ['syneRegular', 'sans-serif'],
      //   syneMedium: ['syneMedium', 'sans-serif'],
      //   lufgaLight: ['lufgaLight', 'sans-serif'],
      //   lufgaBold: ['lufgaBold', 'sans-serif'],
      //   lufgaSemiBold: ['lufgaSemiBold', 'sans-serif'],
      //   LufgaBlack: ['LufgaBlack', 'sans-serif'],
      //   LufgaRegular: ['LufgaRegular', 'sans-serif'],
      //   LufgaMedium: ['LufgaMedium', 'sans-serif'],
      //   syneSemiBold: ['syneSemiBold', 'sans-serif'],

        

      //  },
    },
  },
  plugins: [],
}

