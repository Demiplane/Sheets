import * as React from 'react';
import { Route } from 'react-router';
import App from './App';
import AboutPage from './about/AboutPage';
import SheetsPage from './sheet/SheetsPage';

export default (
    <Route path="/" component={App}>
        <Route exact path="/" component={SheetsPage} />
        <Route path="about" component={AboutPage} />
    </Route>
);