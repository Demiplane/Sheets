import * as React from 'react';
import Sheet, { calculateValue, Statistic, statisticIsBase, statisticHasConditionals } from '../sheet/SheetModel';
import ModifierTable from './ModifierTable';
import Flashy from '../controls/Flashy';

type StatisticsPanelRowProps = {
  editStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;
  expand: (statistic: Statistic) => void;
  className?: string,
  sheet: Sheet,
  statistic: Statistic,
  expanded: boolean
};

export default class StatisticsPanelRow extends React.Component<StatisticsPanelRowProps> {
  constructor(props: StatisticsPanelRowProps) {
    super(props);
  }

  render() {
    const { statistic, sheet, editStatistic, deleteStatistic, expanded, expand } = this.props;
    const hasModifiers = statistic.modifiers && statistic.modifiers.length > 0;
    const detailRowName = statistic.name.replace(' ', '-') + '-detail-row';

    const hasConditionals = statisticHasConditionals(statistic);
    const calculated = calculateValue(sheet, statistic);
    const isBase = statisticIsBase(sheet, statistic);

    return [(
      <tr
        className={'clickable' + (expanded ? ' selected' : '')}
        key={statistic.name}
        onClick={event => { event.preventDefault(); expand(statistic); }}>
        <td>
          {statistic.name}
          {isBase && <small className="text-muted pl-2 float-right">(base)</small>}
          {hasConditionals && <small className="text-muted pl-2 float-right">(conditional)</small>}
        </td>
        <td className="text-center">
          <Flashy value={calculated} />
        </td>
      </tr>
    ),
    expanded && (
      <tr key={statistic.name + 'detail'} id={detailRowName} className="statistics-detail">
        <td colSpan={2} className="p-2 pb-4">
          {hasModifiers && <h6 className="m-2">modifiers</h6>}
          {hasModifiers && <ModifierTable sheet={sheet} modifiers={statistic.modifiers!} />}

          <button
            onClick={event => { event.preventDefault(); deleteStatistic(statistic); }}
            className="btn btn-outline-danger float-right btn-small d-inline mt-2">Delete</button>
          <button
            onClick={event => { event.preventDefault(); editStatistic(statistic); }}
            className="btn btn-outline-primary float-right btn-small d-inline mt-2">Edit</button>
        </td>
      </tr>
    )];
  }
}