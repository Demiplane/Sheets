import * as React from 'react';
import './App.css';
import * as S from './sheet/sheetModel';
import './extensions/Act';

const logo = require('./logo.svg');

interface AppState {
  sheets: S.Sheet[];
}

interface AppProps {

}

class App extends React.Component<AppProps, AppState> {

  state = this.initialState();
    return {
      sheets: [

        restored,

        ,

      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Sheet sheet={this.state.sheets[0]} />
      </div>
    );
  }
}

export default App;