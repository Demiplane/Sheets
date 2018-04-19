import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import routes from './navigation/routes';
import { browserHistory } from 'react-router';
import configureStore from './core/'

const store = configureStore();
store.dispatch(loadSheets());
store.dispatch(loadSystems());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();