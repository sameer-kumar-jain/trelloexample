import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import { Provider } from 'react-redux'
import createHistory from 'history/createMemoryHistory';
import configureStore from './store/configureStore';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = configureStore(history);
const theme = createMuiTheme({typography: {
  useNextVariants: true,
},});

ReactDOM.render(
<BrowserRouter>
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route path={''} render={props => ( <App {...props} /> )} />
      </Switch>
    </MuiThemeProvider>
  </Provider>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
