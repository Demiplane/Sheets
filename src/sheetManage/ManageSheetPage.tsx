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

            addStatistic={s => this.props.updateSheet!(sheet.addStatistic(s))}
            updateStatistic={s => this.props.updateSheet!(sheet.updateStatistic(s))}
            deleteStatistic={s => this.props.updateSheet!(sheet.deleteStatistic(s))}

            updateSheetName={n => this.props.renameSheet!(sheet.name, n)}

            addItem={i => this.props.updateSheet!(sheet.addItem(i))}
            updateItem={i => this.props.updateSheet!(sheet.updateItem(i))}
            deleteItem={i => this.props.updateSheet!(sheet.deleteItem(i))}

            activateCondition={c => this.props.updateSheet!(sheet.activateCondition(c))}
            inactivateCondition={c => this.props.updateSheet!(sheet.inactivateCondition(c))}

            sheet={sheet}
            showModal={this.openModal}
            closeModal={this.closeModal}

            addLog={l => this.props.updateSheet!(sheet.addLog(l))}
            deleteLog={l => this.props.updateSheet!(sheet.deleteLog(l))}
            updateLog={l => this.props.updateSheet!(sheet.updateLog(l))}

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