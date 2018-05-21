import * as React from 'react';
import Sheet, { calculateValue, Statistic, statisticIsBase, statisticHasConditionals } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import ModifierTable from './ModifierTable';
import { FormEvent } from 'react';
import StatisticForm from './StatisticForm';
import Flashy from '../controls/Flashy';
import RootState from '../core/RootState';
import { connect } from 'react-redux';
import { ConnectedSheetProps, mapSheetActions } from '../sheet/sheetActions';

type StatisticsPanelProps = ConnectedSheetProps & {
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;
  className?: string,
  sheet: Sheet
};

export class StatisticsPanel extends React.Component<StatisticsPanelProps, { expanded: string[] }> {
  constructor(props: StatisticsPanelProps) {
    super(props);

    this.state = { expanded: [] };

    this.cancel = this.cancel.bind(this);
    this.onStatisticExpandCollapseClick = this.onStatisticExpandCollapseClick.bind(this);
    this.openAddStatistic = this.openAddStatistic.bind(this);
    this.addStatistic = this.addStatistic.bind(this);
    this.updateStatistic = this.updateStatistic.bind(this);
    this.openEditStatistic = this.openEditStatistic.bind(this);
    this.deleteStatistic = this.deleteStatistic.bind(this);
  }

  statisticIsExpanded(statisticName: string) {
    return this.state.expanded.indexOf(statisticName) >= 0;
  }

  onStatisticExpandCollapseClick(event: FormEvent<Element>, statisticName: string) {
    event.preventDefault();

    if (this.statisticIsExpanded(statisticName)) {
      this.setState({ expanded: this.state.expanded.filter(e => e !== statisticName) });
    } else {
      // this.setState({ expanded: this.state.expanded.concat(statisticName) });
      this.setState({ expanded: [statisticName] });
    }
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

  toRowPair = (sheet: Sheet, statistic: Statistic) => {
    const hasModifiers = statistic.modifiers && statistic.modifiers.length > 0;
    const detailRowName = statistic.name.replace(' ', '-') + '-detail-row';

    const hasConditionals = statisticHasConditionals(statistic);
    const showDetail = this.statisticIsExpanded(statistic.name);
    const calculated = calculateValue(sheet, statistic);
    const isBase = statisticIsBase(sheet, statistic);

    return [(
      <tr
        className={'clickable' + (showDetail ? ' selected' : '')}
        key={statistic.name}
        onClick={event => this.onStatisticExpandCollapseClick(event, statistic.name)}>
        <td>
          {statistic.name}
          {isBase && <small className="text-muted pl-2 float-right">(base)</small>}
          {hasConditionals && <small className="text-muted pl-2 float-right">(conditional)</small>}
        </td>
        <td className="text-center">
          <Flashy display={calculated.toString()} />
        </td>
      </tr>
    ),
    showDetail && (
      <tr key={statistic.name + 'detail'} id={detailRowName} className="statistics-detail">
        <td colSpan={2} className="p-2 pb-4">
          {hasModifiers && <h6 className="m-2">modifiers</h6>}
          {hasModifiers && <ModifierTable sheet={sheet} modifiers={statistic.modifiers!} />}

          <button
            onClick={event => { event.preventDefault(); this.deleteStatistic(statistic); }}
            className="btn btn-outline-danger float-right btn-small d-inline mt-2">Delete</button>
          <button
            onClick={event => { event.preventDefault(); this.openEditStatistic(statistic); }}
            className="btn btn-outline-primary float-right btn-small d-inline mt-2">Edit</button>
        </td>
      </tr>
    )];
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
            {sheet.statistics && sheet.statistics.map(s => this.toRowPair(sheet, s))}
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