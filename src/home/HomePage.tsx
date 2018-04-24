import { History } from 'history';
import * as React from 'react';
import Page from '../controls/Page';

type HomePageProps = {
  history: History;
};

const HomePage: React.StatelessComponent<HomePageProps> = (props) => {
  return (
    <Page>
      <header>
        <h1 className="text-center">WELCOME TO SHEETS</h1>
      </header>
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={() => props.history.push('/sheets')}>Go to your sheets</button>
    </Page>
  );
};

export default HomePage;