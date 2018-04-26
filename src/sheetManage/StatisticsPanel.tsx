import * as React from 'react';
import Sheet, { calculateValue, Statistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import ModifierTable from './ModifierTable';
import ConditionalTable from './ConditionalTable';
import { FormEvent } from 'react';

type StatisticsPanelProps = { className?: string, sheet: Sheet };

export class StatisticsPanel extends React.Component<StatisticsPanelProps, { expanded: string[] }> {
  constructor(props: StatisticsPanelProps) {
    super(props);

    this.state = { expanded: [] };

    this.onStatisticExpandCollapseClick = this.onStatisticExpandCollapseClick.bind(this);
  }

  statisticIsExpanded(statisticName: string) {
    return this.state.expanded.indexOf(statisticName) >= 0;
  }

  onStatisticExpandCollapseClick(event: FormEvent<Element>, statisticName: string) {
    event.preventDefault();

    if (this.statisticIsExpanded(statisticName)) {
      this.setState({ expanded: this.state.expanded.filter(e => e !== statisticName) });
    } else {
      this.setState({ expanded: this.state.expanded.concat(statisticName) });
    }
  }

  toRowPair = (sheet: Sheet, statistic: Statistic) => {
    const hasModifiers = statistic.modifiers && statistic.modifiers.length > 0;
    const hasConditionals = statistic.conditionals && statistic.conditionals.length > 0;
    const detailRowName = statistic.name.replace(' ', '-') + '-detail-row';

    const showDetail = this.statisticIsExpanded(statistic.name);

    return [(
      <tr
        className={'clickable' + (showDetail ? ' selected' : '')}
        key={statistic.name}
        onClick={event => this.onStatisticExpandCollapseClick(event, statistic.name)}>
        <td>{statistic.name}</td>
        <td className="text-center">{calculateValue(sheet, statistic)}</td>
      </tr>
    ),
    showDetail && (
      <tr key={statistic.name + 'detail'} id={detailRowName}>
        <td colSpan={2} className="p-2 pb-4">
          {hasConditionals && <h6 className="m-2">conditionals</h6>}
          {hasConditionals && <ConditionalTable sheet={sheet} conditionals={statistic.conditionals!} />}
          {hasModifiers && <h6 className="m-2">modifiers</h6>}
          {hasModifiers && <ModifierTable modifiers={statistic.modifiers!} />}

          <button className="btn btn-outline-danger float-right btn-small d-inline">Delete</button>
          <button className="btn btn-outline-primary float-right btn-small d-inline">Add Modifier</button>
          <button className="btn btn-outline-primary float-right btn-small d-inline">Add Conditional</button>
        </td>
      </tr>
    )];
  }

  render() {
    const { sheet, className } = this.props;

    return (
      <SheetPanel
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

        <button className="btn btn-outline-primary float-right btn-small d-inline">Add Statistic</button>

      </SheetPanel>
    );
  }
}

export default StatisticsPanel;