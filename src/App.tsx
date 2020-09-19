import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import home from './pages/Home';
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
        <Router>
          <Route exact path="/" component={home} />
          <Route exact path="/search=:queries" component={home} />
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
