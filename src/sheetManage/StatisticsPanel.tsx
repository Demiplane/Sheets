import * as React from 'react';
import Sheet, { Statistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import StatisticForm from './StatisticForm';
import RootState from '../core/RootState';
import { connect } from 'react-redux';
import { ConnectedSheetProps, mapSheetActions } from '../sheet/sheetConnection';
import StatisticsPanelRow from './StatisticsPanelRow';

type StatisticsPanelProps = ConnectedSheetProps & {
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;
  className?: string,
  sheet: Sheet
};

export class StatisticsPanel extends React.Component<StatisticsPanelProps, { expandedStatistic: string }> {
  constructor(props: StatisticsPanelProps) {
    super(props);

    this.state = { expandedStatistic: '' };

    this.cancel = this.cancel.bind(this);
    this.openAddStatistic = this.openAddStatistic.bind(this);
    this.addStatistic = this.addStatistic.bind(this);
    this.updateStatistic = this.updateStatistic.bind(this);
    this.openEditStatistic = this.openEditStatistic.bind(this);
    this.deleteStatistic = this.deleteStatistic.bind(this);
    this.onExpand = this.onExpand.bind(this);
  }

  openEditStatistic(statistic: Statistic) {
    this.props.showModal((
      <StatisticForm
        statistic={statistic}
        sheet={this.props.sheet}
        addStatistic={this.addStatistic}
        updateStatistic={this.updateStatistic}
        cancel={this.cancel}
      />
    ));
  }

  deleteStatistic(statistic: Statistic) {
    const oldStatistics = this.props.sheet.statistics || [];
    const updatedSheet = Object.assign(
      {},
      this.props.sheet,
      {
        statistics: oldStatistics.filter(s => s.name !== statistic.name)
      });
    this.props.updateSheet!(updatedSheet);
  }

  addStatistic(statistic: Statistic) {
    this.props.addStatistic!(this.props.sheet.identifier, statistic);
    this.props.closeModal();
  }

  updateStatistic(statistic: Statistic) {
    this.props.updateStatistic!(this.props.sheet.identifier, statistic);
    this.props.closeModal();
  }

  cancel() {
    this.props.closeModal();
  }

  openAddStatistic() {
    this.props.showModal((
      <StatisticForm
        sheet={this.props.sheet}
        addStatistic={this.addStatistic}
        updateStatistic={this.updateStatistic}
        cancel={this.cancel} />
    ));
  }

  onExpand(statistic: Statistic) {
    this.setState({ expandedStatistic: statistic.name });
  }

  render() {
    const { sheet, className } = this.props;

    return (
      <SheetPanel
        onAdd={this.openAddStatistic}
        title="Statistics"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">Value</th>
            </tr>
          </thead>

          <tbody>
            {sheet.statistics && sheet.statistics.map(s => (
              <StatisticsPanelRow
                statistic={s}
                sheet={sheet}
                editStatistic={this.openEditStatistic}
                deleteStatistic={this.deleteStatistic}
                expand={this.onExpand}
                expanded={this.state.expandedStatistic === s.name} />
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: StatisticsPanelProps) {
  return ownProps;
}

export default connect(mapStateToProps, mapSheetActions)(StatisticsPanel);