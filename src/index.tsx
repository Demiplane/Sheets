import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import ManageSheetPage from './sheetManage/ManageSheetPage';
import { Provider } from 'react-redux';
import { SheetApi, MockSheetApi } from './sheet/SheetApi';
import { Switch, Route, Redirect } from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AboutPage from './about/AboutPage';
import App from './App';
import configureStore from './core/configureStore';
import HomePage from './home/HomePage';
import NotFoundPage from './error/NotFoundPage';
import registerServiceWorker from './registerServiceWorker';
import SheetsPage from './sheetList/SheetsPage';
import { loadSheets } from './sheetActions/loadSheets';

const sheetApi: SheetApi = new MockSheetApi();
const store = configureStore();

sheetApi.getAllSheets()
  .then(sheets => {
    store.dispatch(loadSheets(sheets));
  });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="build">
      <App>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path={process.env.PUBLIC_URL + '/about'} component={AboutPage} />
          <Route path={process.env.PUBLIC_URL + '/sheets'} component={SheetsPage} />
          <Route path={process.env.PUBLIC_URL + '/sheet/:id'} component={ManageSheetPage} />
          <Route path={process.env.PUBLIC_URL + '/notfound'} component={NotFoundPage} />
          <Redirect to={process.env.PUBLIC_URL + '/notfound'} />
        </Switch>
      </App>

    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();