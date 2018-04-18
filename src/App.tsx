import * as React from 'react';
import * as S from './sheet/sheetModel';
import './extensions/Act';

interface AppState {
  sheets: S.Sheet[];
}

interface AppProps {

}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="main">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <a className="navbar-brand" href="#">Sheets</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <header>
          <h1>Sheets</h1>
          <p>character sheet management</p>
        </header>

        <div className="container-fluid main-column">
          <div className="row">
            <div className="col">
              <h1>table one</h1>
              <table>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
              </table>
            </div>

            <div className="col">

              <h1>Resources</h1>
              <table>
                <tr>
                  <td>name</td>
                  <td>value</td>
                </tr>
              </table>
            </div>

          </div>
        </div>

        <div className="container-fluid main-column">
          <div className="row">
            <div className="col">
              <div className="col-12 card statistic-panel">
                <h1>table one</h1>
                <table>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                </table>
              </div>
              <div className="col-12 card statistic-panel">
                <h1>table two</h1>
                <table>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-6">
              <div className="col-12 card statistic-panel">
                <h1>Resources</h1>
                <table>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                </table>
              </div>
              <div className="col-12 card statistic-panel">
                <h1>Actions</h1>
                <table>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                </table>
              </div>
              <div className="col-12 card statistic-panel">
                <h1>Abilities</h1>
                <table>
                  <tr>
                    <td>name</td>
                    <td>value</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <p>Footer Stuff Goes Here™</p>
        </footer>
      </div>
    );
  }
}

export default App;