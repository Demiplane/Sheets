import * as React from 'react';
import * as S from './sheet/SheetModel';
import './extensions/Act';
import NavBar from './NavBar';

interface AppState {
  sheets: S.Sheet[];
}

interface AppProps {
}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="main">
        <NavBar />
        {this.props.children}
        <footer>
          <p>Footer Stuff Goes Here™</p>
        </footer>
      </div>
    );
  }
}

export default App;