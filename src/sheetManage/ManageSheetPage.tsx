import { connect } from 'react-redux';
import Sheet from '../sheet/SheetModel';
import * as React from 'react';
import RootState from '../core/RootState';
import { RouteComponentProps } from 'react-router-dom';
import SheetForm from './SheetForm';
import Modal from '../controls/Modal';

type ManageSheetPageProps = {
  sheet: Sheet;
} & RouteComponentProps<{ id: string }>;

type ManageSheetPageState = {
  modal?: JSX.Element;
};

export class ManageSheetPage extends React.Component<ManageSheetPageProps, ManageSheetPageState> {
  constructor(props: ManageSheetPageProps) {
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {};
  }

  goBack() {
    this.props.history.push('/sheets');
  }

  openModal(modalElement: JSX.Element) {
    this.setState({
      modal: (
        <Modal>
          {modalElement}
        </Modal>
      )
    });
  }

  closeModal() {
    this.setState({ modal: undefined });
  }

  render() {
    return (
      <div>
        <SheetForm
          sheet={this.props.sheet}
          showModal={this.openModal}
          closeModal={this.closeModal} />
        {this.state.modal}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: ManageSheetPageProps): ManageSheetPageProps => {
  let sheetIdentifier = ownProps.match.params.id;
  let sheets = state.sheetState.sheets.filter(s => s.identifier === sheetIdentifier);

  return Object.assign({}, ownProps, { sheet: sheets.length > 0 ? sheets[0] : undefined });
};

export default connect(mapStateToProps)(ManageSheetPage);