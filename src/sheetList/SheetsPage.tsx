import { connect } from 'react-redux';
import { History } from 'history';
import * as Model from '../sheet/SheetModel';
import * as React from 'react';
import RootState from '../core/RootState';
import SheetRow from './SheetRow';
import Page from '../controls/Page';

type SheetsPageProps = {
  sheets: Model.Sheet[];
  history: History;
};

export class SheetsPage extends React.Component<SheetsPageProps> {
  constructor(props: SheetsPageProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = (identifier: number) => this.props.history.push('sheet/' + identifier);

  render() {
    return (
      <Page>
        <header>
          <h1>Your Sheets</h1>
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
                <SheetRow key={sheet.id} sheet={sheet} onSelected={this.onSelect} />
              ))}
          </tbody>
        </table>
      </Page>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  sheets: state.sheetState.sheets
});

export default connect(mapStateToProps)(SheetsPage);