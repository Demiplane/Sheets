import * as React from 'react';

export default class SheetsPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Your Sheets</h1>
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
      </div>
    );
  }
}