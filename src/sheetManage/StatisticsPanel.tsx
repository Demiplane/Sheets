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
    this.onExpand = this.onExpand.bind(this);
    this.newStatistic = this.newStatistic.bind(this);
    this.updateFormula = this.updateFormula.bind(this);
  }

  newStatistic(): Statistic {
    return this.props.sheet.createCandidateStatistic();
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

  render() {
    const { sheet, className } = this.props;

    return (
      <SheetPanel
        title="Statistics"
        className={className}>

        <table className="table table-bordered table-hover">

          <tbody>
            {sheet.resolvedStatistics.map((statistic, index) => (
              <tr key={statistic.name} className="align-center">
                <td style={{ width: '99%', verticalAlign: 'middle' }}>
                  <InlineEdit priorValue={statistic.name} onChange={c => this.updateName(index, statistic, c)} />
                  <br />
                  <FormulaInlineEdit
                    sheet={this.props.sheet}
                    className="text-muted small"
                    onChange={f => this.updateFormula(index, statistic, f)}
                    priorFormula={statistic.formula} />
                </td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                  {statistic.base && <small className="text-muted">(base)</small>}
                  {statistic.base && statistic.affected && <br />}
                  {statistic.affected && <small className="text-muted">(affected)</small>}
                </td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                  <Flashy classes="prominent" value={statistic.value} />
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <DeleteButton onDelete={() => this.props.deleteStatistic(statistic)} />
                </td>
              </tr>))}
          </tbody>

        </table>

        <AddBox placeholder="add statistic" onAdd={this.addStatistic} />

      </SheetPanel>
    );
  }
}

export default StatisticsPanel;