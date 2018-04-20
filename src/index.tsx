import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './core/configureStore';
import { Provider } from 'react-redux';
import { loadSheets } from './sheet/sheetActions';
import App from './App';
import { SheetApi, MockSheetApi } from './sheet/SheetApi';
import { Switch, Route } from 'react-router';
import SheetsPage from './sheet/SheetsPage';
import AboutPage from './about/AboutPage';

const sheetApi: SheetApi = new MockSheetApi();
const store = configureStore();

sheetApi.getAllSheets()
  .then(sheets => {
    store.dispatch(loadSheets(sheets));
  });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact={true} path="/" component={SheetsPage} />
          <Route path="/about" component={AboutPage} />
        </Switch>
      </App>

    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();