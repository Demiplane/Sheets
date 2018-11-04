import * as React from 'react';
import Sheet, { Statistic, ResolvedStatistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import Flashy from '../controls/Flashy';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import InlineEdit from '../controls/InlineEdit';
import MegaTable from '../controls/MegaTable';

type StatisticdivelProps = {
  updateStatistic: (index: number, statistic: Statistic) => void;
  addStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;
  reorder: (indexToMove: number, newLocation: number) => void;

  className?: string,
  sheet: Sheet
};

class Table extends MegaTable<ResolvedStatistic> { }

export class Statisticdivel extends React.Component<StatisticdivelProps> {
  constructor(props: StatisticdivelProps) {
    super(props);
  }

  render() {
    const { sheet, className, updateStatistic, addStatistic, deleteStatistic, reorder } = this.props;

    return (
      <SheetPanel
        title="Statistics"
        className={className}>

        <Table
          items={sheet.resolvedStatistics}
          add={name => addStatistic(sheet.createCandidateStatistic(name))}
          addPlaceholder="add statistic"
          keySelector={statistic => statistic.name}
          move={(from, to) => reorder(from, to)}
          remove={statistic => deleteStatistic(statistic)}
          render={(index, statistic) => [
            (
              <div style={{ width: '100%' }}>
                <InlineEdit priorValue={statistic.name} 
                  onChange={c => updateStatistic(index, statistic.updateName(c))} />
                <br />
                <FormulaInlineEdit
                  sheet={this.props.sheet}
                  className="text-muted small"
                  onChange={f => updateStatistic(index, statistic.updateFormula(f))}
                  priorFormula={statistic.formula} />
              </div>
            ), (
              <div className="pl-2">
                {statistic.base && <small className="text-muted">(base)</small>}
                {statistic.base && statistic.affected && <br />}
                {statistic.affected && <small className="text-muted">(affected)</small>}
              </div>
            ), (
              <div className="pl-2">
                <Flashy classes="prominent" value={statistic.value} />
              </div>
            )
          ]}
        />

      </SheetPanel>
    );
  }
}

export default Statisticdivel;