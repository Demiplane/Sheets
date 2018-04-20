import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { MemoryRouter } from 'react-router';
import configureStore from './core/configureStore';
import { Provider } from 'react-redux';
import { loadSheets } from './sheet/sheetActions';
import { Route } from 'react-router';
import App from './App';
import AboutPage from './about/AboutPage';
import SheetsPage from './sheet/SheetsPage';
import { SheetApi, MockSheetApi } from './sheet/SheetApi';

const sheetApi: SheetApi = new MockSheetApi();
const store = configureStore();

sheetApi.getAllSheets()
  .then(sheets => {
    store.dispatch(loadSheets(sheets));
  });

ReactDOM.render(
  <Provider store={store}>
    <MemoryRouter>
      <Route path="/" component={App}>
        <Route exact={true} path="/" component={SheetsPage} />
        <Route path="about" component={AboutPage} />
      </Route>
    </MemoryRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();