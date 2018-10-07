import * as React from 'react';
import Sheet, { Statistic, ResolvedStatistic } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import Flashy from '../controls/Flashy';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import UpDown from '../controls/UpDown';

type StatisticdivelProps = {
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;

  updateStatistic: (index: number, statistic: Statistic) => void;
  addStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;
  reorderStatistics: (indexToMove: number, newLocation: number) => void;

  className?: string,
  sheet: Sheet
};

export class Statisticdivel extends React.Component<StatisticdivelProps, { expandedStatistic: string }> {
  constructor(props: StatisticdivelProps) {
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

        <div className="list-group">
          {sheet.resolvedStatistics.map((statistic, index) => (
            <div 
              key={statistic.name}
              className="list-group-item d-flex align-items-center">
              <div className="mr-auto"
                style={{ width: '99%', verticalAlign: 'middle' }}>
                <InlineEdit priorValue={statistic.name} onChange={c => this.updateName(index, statistic, c)} />
                <br />
                <FormulaInlineEdit
                  sheet={this.props.sheet}
                  className="text-muted small"
                  onChange={f => this.updateFormula(index, statistic, f)}
                  priorFormula={statistic.formula} />
              </div>
              <div className="pl-2">
                {statistic.base && <small className="text-muted">(base)</small>}
                {statistic.base && statistic.affected && <br />}
                {statistic.affected && <small className="text-muted">(affected)</small>}
              </div>
              <div className="pl-2">
                <Flashy classes="prominent" value={statistic.value} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <DeleteButton onDelete={() => this.props.deleteStatistic(statistic)} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <UpDown
                  onUp={() => this.props.reorderStatistics(index, index - 1)}
                  onDown={() => this.props.reorderStatistics(index, index + 1)} />
              </div>
            </div>))}
        </div>

        <AddBox placeholder="add statistic" onAdd={this.addStatistic} />

      </SheetPanel>
    );
  }
}

export default Statisticdivel;