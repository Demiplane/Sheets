import * as React from 'react';
import Sheet, { Statistic, ResolvedStatistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import Flashy from '../controls/Flashy';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';

type StatisticsPanelProps = {
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;

  updateStatistic: (index: number, statistic: Statistic) => void;
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
    this.addStatistic = this.addStatistic.bind(this);
    this.editStatistic = this.editStatistic.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.newStatistic = this.newStatistic.bind(this);
    this.updateFormula = this.updateFormula.bind(this);
  }

  newStatistic(): Statistic {
    return this.props.sheet.createCandidateStatistic();
  }

  editStatistic(statistic: Statistic) {
    console.log('implement me');
  }

  cancel() {
    this.props.closeModal();
  }

  addStatistic(name: string) {
    this.props.addStatistic(new Statistic({ name }));
  }

  onExpand(statistic: ResolvedStatistic) {
    const expandedStatistic = statistic.name === this.state.expandedStatistic ? '' : statistic.name;

    this.setState({ expandedStatistic });
  }

  updateFormula(index: number, statistic: Statistic, formula: string) {
    this.props.updateStatistic(index, statistic.updateFormula(formula));
  }

  updateName(index: number, statistic: Statistic, name: string) {
    this.props.updateStatistic(index, statistic.updateName(name));
  }

  row(index: number, statistic: ResolvedStatistic): React.ReactNode {

    return (
      <tr key={statistic.name}>
        <td style={{ width: '99%' }}>
          <InlineEdit priorValue={statistic.name} onChange={c => this.updateName(index, statistic, c)} />
          <br />
          <FormulaInlineEdit
            sheet={this.props.sheet}
            className="text-muted small"
            onChange={f => this.updateFormula(index, statistic, f)}
            priorFormula={statistic.formula} />
          {statistic.base && <small className="text-muted pl-2 float-right">(base)</small>}
          {statistic.affected && <small className="text-muted pl-2 float-right">(affected)</small>}
        </td>
        <td className="text-center">
          <Flashy classes="prominent" value={statistic.value} />
        </td>
        <td>
          <DeleteButton onDelete={() => this.props.deleteStatistic(statistic)} />
        </td>
      </tr>);
  }

  render() {
    const { sheet, className } = this.props;

    return (
      <SheetPanel
        title="Statistics"
        className={className}>

        <table className="table table-bordered table-hover">

          <tbody>
            {sheet.resolvedStatistics.map((s, i) => this.row(i, s))}
          </tbody>

        </table>

        <AddBox onAdd={this.addStatistic} />

      </SheetPanel>
    );
  }
}

export default StatisticsPanel;