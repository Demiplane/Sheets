import * as React from 'react';
import Sheet, { Statistic, nextId } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import StatisticForm from './StatisticForm';
import StatisticsPanelRow from './StatisticsPanelRow';

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
    return {
      id: nextId(this.props.sheet.statistics),
      name: ''
    };
  }

  openEditStatistic(statistic: Statistic) {
    this.props.showModal((
      <StatisticForm
        statistic={statistic}
        sheet={this.props.sheet}
        save={s => { this.props.updateStatistic(s); this.props.closeModal(); }}
        cancel={this.cancel}
      />
    ));
  }

  cancel() {
    this.props.closeModal();
  }

  openAddStatistic() {
    this.props.showModal((
      <StatisticForm
        sheet={this.props.sheet}
        statistic={this.newStatistic()}
        save={s => { this.props.addStatistic(s); this.props.closeModal(); }}
        cancel={this.cancel} />
    ));
  }

  onExpand(statistic: Statistic) {
    const expandedStatistic = statistic.name === this.state.expandedStatistic ? '' : statistic.name;

    this.setState({ expandedStatistic });
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
                deleteStatistic={this.props.deleteStatistic}
                expand={this.onExpand}
                expanded={this.state.expandedStatistic === s.name} />
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  }
}

export default StatisticsPanel;