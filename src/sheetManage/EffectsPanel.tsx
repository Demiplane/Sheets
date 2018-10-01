import * as React from 'react';
import Sheet, { Effect } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import TargetInlineListEdit from '../controls/TargetInlineListEdit';

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
  }

  toRowPair = (sheet: Sheet, effect: Effect, index: number) => {
    const isActive = effect.active;

    return (
      <tr key={effect.name}>
        <td>
          <InlineEdit
            priorValue={effect.name}
            onChange={v => this.props.updateEffect(index, effect.updateName(v))} />
          <br />
          <TargetInlineListEdit priorValue={effect.targets}
            onChange={t => this.props.updateEffect(index, effect.updateTargets(t))}
            sheet={this.props.sheet} />
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
        <td><DeleteButton onDelete={() => this.props.deleteEffect(effect)} /></td>
      </tr>
    );
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
            {effects.map((effect, index) => this.toRowPair(sheet, effect, index))}
          </tbody>

        </table>

        <AddBox onAdd={name => addEffect(new Effect({ name }))} />

      </SheetPanel>
    );
  }
}

export default EffectsPanel;