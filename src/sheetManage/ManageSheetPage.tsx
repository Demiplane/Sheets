import { connect } from 'react-redux';
import Sheet from '../sheet/SheetModel';
import * as React from 'react';
import RootState from '../core/RootState';
import { RouteComponentProps } from 'react-router-dom';
import SheetForm from './SheetForm';

type ManageSheetPageProps = {
  sheet: Sheet;
} & RouteComponentProps<{ id: string }>;

export class ManageSheetPage extends React.Component<ManageSheetPageProps> {
  constructor(props: ManageSheetPageProps) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  goBack() {
    this.props.history.push('/sheets');
  }

  onSave(event: React.FormEvent<HTMLInputElement>) {
    alert('saved!');
  }

  render() {
    return <SheetForm sheet={this.props.sheet} onSave={this.onSave} />;
  }
}

const mapStateToProps = (state: RootState, ownProps: ManageSheetPageProps): ManageSheetPageProps => {
  let sheetIdentifier = ownProps.match.params.id;
  let sheets = state.sheetState.sheets.filter(s => s.identifier === sheetIdentifier);

  return Object.assign({}, ownProps, { sheet: sheets.length > 0 ? sheets[0] : undefined });
};

export default connect(mapStateToProps)(ManageSheetPage);