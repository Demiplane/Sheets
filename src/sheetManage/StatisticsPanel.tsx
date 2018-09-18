import * as React from 'react';
import Sheet, { Statistic, ResolvedStatistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import Flashy from '../controls/Flashy';

type StatisticsPanelProps = {
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;

  updateStatistic: (statistic: Statistic) => void;
  addStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;

  className?: string,
  sheet: Sheet
};

export class StatisticsPanel extends React.Component<StatisticsPanelProps, { expandedStatistic: string }> {
  constructor(props: StatisticsPanelProps) {
    super(props);

    this.state = { expandedStatistic: '' };

    this.cancel = this.cancel.bind(this);
    this.openAddStatistic = this.openAddStatistic.bind(this);
    this.openEditStatistic = this.openEditStatistic.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.newStatistic = this.newStatistic.bind(this);
  }

  newStatistic(): Statistic {
    return new Statistic({});
  }

  openEditStatistic(statistic: Statistic) {
    console.log('implement me');
  }

  cancel() {
    this.props.closeModal();
  }

  openAddStatistic() {
    console.log('implement me');
  }

  onExpand(statistic: ResolvedStatistic) {
    const expandedStatistic = statistic.name === this.state.expandedStatistic ? '' : statistic.name;

    this.setState({ expandedStatistic });
  }

  row(statistic: ResolvedStatistic): React.ReactNode {

    return (
      <tr key={statistic.name}>
        <td>
          <span>{statistic.name}</span><br />
          <span className="text-muted">{statistic.formula}</span>
          {statistic.base && <small className="text-muted pl-2 float-right">(base)</small>}
          {statistic.conditional && <small className="text-muted pl-2 float-right">(conditional)</small>}
        </td>
        <td className="text-center">
          <Flashy value={statistic.value} />
        </td>
      </tr>);
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
            {sheet.resolvedStatistics.map(s => this.row(s))}
          </tbody>

        </table>

      </SheetPanel>
    );
  }
}

export default StatisticsPanel;