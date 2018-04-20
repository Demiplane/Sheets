import * as React from 'react';
import { connect } from 'react-redux';
import RootState from '../core/RootState';
import * as Model from './SheetModel';
import SheetRow from './SheetRow';

type SheetsPageProps = {
  sheets: Model.Sheet[];
};

export class SheetsPage extends React.Component<SheetsPageProps> {
  constructor(props: SheetsPageProps) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid sheet-page pb-4 pt-4 pl-4 pr-4">
        <header>
          <h1>Your Sheets</h1>
        </header>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.sheets.map(sheet => <SheetRow key={sheet.identifier} sheet={sheet} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sheets: state.sheetState.sheets
});

export default connect(mapStateToProps)(SheetsPage);