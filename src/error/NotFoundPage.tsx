import * as React from 'react';
import Page from '../controls/Page';

const NotFoundPage: React.StatelessComponent<{}> = () => {
  return (
    <Page className="text-center">
      <header>
        <h1>Something went wrong!</h1>
      </header>
      <p>We couldn't find the page you were looking for.</p>
    </Page>
  );
};

export default NotFoundPage;