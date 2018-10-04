import * as React from 'react';
import Sheet, { Effect, Target } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';

type EffectsPanelProps = {
  className?: string,
  sheet: Sheet,
  activateEffect: (effect: Effect) => void;
  inactivateEffect: (effect: Effect) => void;
  updateEffect: (index: number, effect: Effect) => void;
  addEffect: (effect: Effect) => void;
  deleteEffect: (effect: Effect) => void;
};

class EffectsPanel extends React.Component<EffectsPanelProps, { expanded: string[] }> {
  constructor(props: EffectsPanelProps) {
    super(props);

    this.state = { expanded: [] };
  }

  toRow = (sheet: Sheet, effect: Effect, index: number) => {
    const isActive = effect.active;

    const expanded = this.state.expanded.find(f => effect.name === f) ? true : false;

    var rows = [(
      <tr key={effect.name}>
        <td style={{ width: '100%' }}>
          <InlineEdit
            priorValue={effect.name}
            onChange={v => this.props.updateEffect(index, effect.updateName(v))} />
        </td>
        <td className="text-center">
          <button
            className={'btn btn-small ' + (isActive ? 'btn-primary' : '')}
            onClick={event => {
              event.preventDefault();
              isActive ? this.props.inactivateEffect(effect) : this.props.activateEffect(effect);
            }}>
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </button>
        </td>
        <td>
          <button
            onClick={evt => {
              evt.preventDefault();
              expanded ?
                this.setState({ expanded: [...this.state.expanded.filter(f => f !== effect.name)] }) :
                this.setState({ expanded: [...this.state.expanded, effect.name] });
            }}
            className="btn btn-primary">{expanded ? '-' : '+'}</button>
        </td>
        <td><DeleteButton onDelete={() => this.props.deleteEffect(effect)} /></td>
      </tr>
    )];

    if (expanded) {
      rows = rows.concat(...effect.targets.map((target, targetIndex) => (
        <tr key={effect.name + target.statisticName}>
          <td>
            <InlineEdit
              priorValue={target.statisticName}
              onChange={n => this.props.updateEffect(
                index,
                effect.updateTarget(targetIndex, target.updateName(n)))} />
          </td>
          <td colSpan={2}>
            <FormulaInlineEdit
              priorFormula={target.formula}
              sheet={sheet}
              onChange={n => this.props.updateEffect(
                index,
                effect.updateTarget(targetIndex, target.updateFormula(n)))} />
          </td>
          <td>
            <DeleteButton onDelete={() => this.props.updateEffect(index, effect.deleteTarget(target))} />
          </td>
        </tr>
      )));
      rows.push((
        <tr key={effect.name + 'addTarget'}>
          <td colSpan={4}>
            <AddBox
              placeholder="add target"
              onAdd={statisticName => this.props.updateEffect(
                index,
                effect.addTarget(new Target({ statisticName })))} />
          </td>
        </tr>
      ));
    }

    return rows;
  }

  render() {
    const { sheet, className, addEffect } = this.props;
    const effects = sheet.effects;

    return (
      <SheetPanel
        title="Effects"
        className={className}>

        <table className="table table-bordered table-hover">

          <tbody>
            {effects.map((effect, index) => this.toRow(sheet, effect, index))}
          </tbody>

        </table>

        <AddBox placeholder="add effect" onAdd={name => addEffect(new Effect({ name }))} />

      </SheetPanel>
    );
  }
}

export default EffectsPanel;