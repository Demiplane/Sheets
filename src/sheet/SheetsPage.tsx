import * as React from 'react';
import { connect } from 'react-redux';
import RootState from '../core/RootState';
import * as Model from './SheetModel';

type SheetsPageProps = {
  sheets: Model.Sheet[];
};

export class SheetsPage extends React.Component<SheetsPageProps> {
  constructor(props: SheetsPageProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Your Sheets</h1>
        </header>
        <ul>
          {this.props.sheets.map(sheet => <li key={sheet.identifier}>{sheet.name}</li>)} 
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sheets: state.sheetState.sheets
});

export default connect(mapStateToProps)(SheetsPage);