import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors: {
    brand: {
      300: '#ffcdb2',
      400: '#ffb4a2',
      500: '#e5989b',
      600: '#b5838d',
      700: '#6d6875',
    },
  },
});

export default theme;
