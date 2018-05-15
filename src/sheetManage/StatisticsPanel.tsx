import * as React from 'react';
import Sheet, { calculateValue, Statistic, statisticIsBase, statisticHasConditionals } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import ModifierTable from './ModifierTable';
import { FormEvent } from 'react';
import StatisticForm from './StatisticForm';

type StatisticsPanelProps = {
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
    this.addStatistic = this.addStatistic.bind(this);
    this.saveStatistic = this.saveStatistic.bind(this);
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
        <td className="text-center">{calculated}</td>
      </tr>
    ),
    showDetail && (
      <tr key={statistic.name + 'detail'} id={detailRowName} className="statistics-detail">
        <td colSpan={2} className="p-2 pb-4">
          {hasModifiers && <h6 className="m-2">modifiers</h6>}
          {hasModifiers && <ModifierTable sheet={sheet} modifiers={statistic.modifiers!} />}

          <button className="btn btn-outline-danger float-right btn-small d-inline">Delete</button>
          <button className="btn btn-outline-primary float-right btn-small d-inline">Edit</button>
        </td>
      </tr>
    )];
  }

  saveStatistic(statistic: Statistic) {
    this.props.closeModal();
  }

  cancel() {
    this.props.closeModal();
  }

  addStatistic() {
    this.props.showModal((
      <StatisticForm saveStatistic={this.saveStatistic} cancel={this.cancel} />
    ));
  }

  render() {
    const { sheet, className } = this.props;

    return (
      <SheetPanel
        onAdd={this.addStatistic}
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

export default StatisticsPanel;