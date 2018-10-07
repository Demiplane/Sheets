import * as React from 'react';
import Sheet, { Effect, Target } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import UpDown from '../controls/UpDown';

type EffectsPanelProps = {
  className?: string,
  sheet: Sheet,
  activateEffect: (effect: Effect) => void;
  inactivateEffect: (effect: Effect) => void;
  updateEffect: (index: number, effect: Effect) => void;
  addEffect: (effect: Effect) => void;
  deleteEffect: (effect: Effect) => void;
  reorder: (from: number, to: number) => void;
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
      <div key={effect.name}
        className="list-group-item d-flex align-items-center">
        <div style={{ width: '100%' }}>
          <InlineEdit
            priorValue={effect.name}
            onChange={v => this.props.updateEffect(index, effect.updateName(v))} />
        </div>
        <div className="pl-2">
          <button
            className={'btn btn-small ' + (isActive ? 'btn-primary' : '')}
            onClick={event => {
              event.preventDefault();
              isActive ? this.props.inactivateEffect(effect) : this.props.activateEffect(effect);
            }}>
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </button>
        </div>
        <div className="pl-2 hide-unless-hover">
          <button
            onClick={evt => {
              evt.preventDefault();
              expanded ?
                this.setState({ expanded: [...this.state.expanded.filter(f => f !== effect.name)] }) :
                this.setState({ expanded: [...this.state.expanded, effect.name] });
            }}
            className="btn btn-primary">{expanded ? '↑' : '↓'}</button>
        </div>
        <div className="pl-2 hide-unless-hover"><DeleteButton onDelete={() => this.props.deleteEffect(effect)} /></div>
        <div className="pl-2 hide-unless-hover">
          <UpDown
            onUp={() => this.props.reorder(index, index - 1)}
            onDown={() => this.props.reorder(index, index + 1)} />
        </div>
      </div>
    )];

    if (expanded) {
      rows = rows.concat(...effect.targets.map((target, targetIndex) => (
        <div
          key={effect.name + target.statisticName}
          className="ml-4 list-group-item d-flex align-items-center">
          <div style={{ width: '100%' }}>
            <div>
              <InlineEdit
                priorValue={target.statisticName}
                onChange={n => this.props.updateEffect(
                  index,
                  effect.updateTarget(targetIndex, target.updateName(n)))} />
            </div>
            <div>
              <FormulaInlineEdit
                className="text-muted small"
                priorFormula={target.formula}
                sheet={sheet}
                onChange={n => this.props.updateEffect(
                  index,
                  effect.updateTarget(targetIndex, target.updateFormula(n)))} />
            </div>
          </div>
          <div className="pl-2">
            <DeleteButton onDelete={() => this.props.updateEffect(index, effect.deleteTarget(target))} />
          </div>
        </div>
      )));
      rows.push((
        <div
          key={effect.name + 'addTarget'}
          className="ml-4 list-group-item d-flex align-items-center">
          <AddBox
            placeholder="add target"
            onAdd={statisticName => this.props.updateEffect(
              index,
              effect.addTarget(new Target({ statisticName })))} />
        </div>
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

        <div className="list-group">
          {effects.map((effect, index) => this.toRow(sheet, effect, index))}
        </div>

        <AddBox placeholder="add effect" onAdd={name => addEffect(new Effect({ name }))} />

      </SheetPanel>
    );
  }
}

export default EffectsPanel;