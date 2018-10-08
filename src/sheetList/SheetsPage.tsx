import { connect } from 'react-redux';
import { History } from 'history';
import Sheet, * as Model from '../sheet/SheetModel';
import * as React from 'react';
import RootState from '../core/RootState';
import SheetRow from './SheetRow';
import Page from '../controls/Page';
import { ConnectedSheetProps, mapSheetActions } from '../sheet/sheetConnection';
import AddBox from '../controls/AddBox';

type SheetsPageProps = {
  sheets: Model.Sheet[];
  history: History;
};

export class SheetsPage extends React.Component<ConnectedSheetProps & SheetsPageProps> {
  constructor(props: SheetsPageProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.loadSheet = this.loadSheet.bind(this);
  }

  onSelect = (identifier: string) => this.props.history.push('sheet/' + identifier);

  loadSheet(sheet: Sheet) {

    this.props.loadSheet!(sheet);
  }

  render() {

    return (
      <Page>
        <header className="d-flex">
          <h1 className="flex-grow-1">Your Sheets</h1>

          <div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Load</span>
              </div>
              <input type="file" className="form-control" onChange={evt => {
                var input = evt.target;
                var file = input.files![0];

                if (file) {
                  var reader = new FileReader();
                  var ls = this.loadSheet;

                  reader.onload = function () {
                    var text = reader.result || '';

                    var sheet = new Sheet(JSON.parse(text.toString()));

                    ls(sheet);
                  };
                  reader.readAsText(input.files![0]);
                }
              }} />
            </div>
          </div>
        </header>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sheets
              .sort((l, r) => l.name.toLowerCase() > r.name.toLowerCase() ? 1 : -1)
              .map(sheet => (
                <SheetRow key={sheet.name} sheet={sheet} onSelected={this.onSelect} />
              ))}
          </tbody>
        </table>
        <AddBox onAdd={name => this.loadSheet(new Sheet({name}))} />
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sheets: state.sheetState.sheets
});

export default connect(mapStateToProps, mapSheetActions)(SheetsPage);