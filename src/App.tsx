import React from 'react';
import './App.css';
import Home from './pages/Home';
import {MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './assets/theme';
import store from './redux/store';
import {Provider} from 'react-redux';

const theme = createMuiTheme(themeFile);
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Home />
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
