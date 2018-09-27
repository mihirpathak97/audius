import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#662d91' },
    secondary: { main: '#f50057' },
    error: { main: '#ff1744' }
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});

export default theme;
