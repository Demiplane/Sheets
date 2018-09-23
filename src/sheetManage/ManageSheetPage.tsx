import { connect } from 'react-redux';
import Sheet from '../sheet/SheetModel';
import * as React from 'react';
import RootState from '../core/RootState';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import SheetForm from './SheetForm';
import Modal from '../controls/Modal';
import { ConnectedSheetProps, mapSheetActions } from '../sheet/sheetConnection';
import FluidPage from '../controls/FluidPage';

type ManageSheetPageProps = ConnectedSheetProps & {
  sheet?: Sheet;
  loading: boolean;
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
    const { sheet, loading } = this.props;

    if (loading) {
      return <FluidPage><p className="text-center">Loading...</p></FluidPage>;
    } else if (sheet) {
      return (
        <div>
          <SheetForm

            addStatistic={s => this.props.addStatistic!(sheet.name, s)}
            updateStatistic={s => this.props.updateStatistic!(sheet.name, s)}
            deleteStatistic={s => this.props.deleteStatistic!(sheet.name, s)}

            updateSheetName={n => this.props.renameSheet!(sheet.name, n)}

            addItem={i => this.props.addItem!(sheet.name, i)}
            updateItem={i => this.props.updateItem!(sheet.name, i)}
            deleteItem={i => this.props.deleteItem!(sheet.name, i)}

            activateCondition={c => this.props.activateCondition!(sheet.name, c)}
            inactivateCondition={c => this.props.inactivateCondition!(sheet.name, c)}

            sheet={sheet}
            showModal={this.openModal}
            closeModal={this.closeModal} 
            
            addLog={l => this.props.addLog!(sheet.name, l)}
            deleteLog={l => this.props.deleteLog!(sheet.name, l)}
            
            />

          {this.state.modal}
        </div>
      );
    } else {
      return <Redirect to="/notfound" />;
    }
  }
}

const mapStateToProps = (state: RootState, ownProps: ManageSheetPageProps): ManageSheetPageProps => {
  let sheetIdentifier = ownProps.match.params.id;
  let sheet = state.sheetState.sheets.find(s => s.name === sheetIdentifier);

  return Object.assign({}, ownProps, { sheet, loading: state.loading });
};

export default connect(mapStateToProps, mapSheetActions)(ManageSheetPage);