import * as React from 'react';
import Sheet, { Effect } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

type EffectsPanelProps = {
  className?: string,
  sheet: Sheet,
  activateEffect: (effect: Effect) => void;
  inactivateEffect: (effect: Effect) => void;
};

class EffectsPanel extends React.Component<EffectsPanelProps, { expanded: string[] }> {
  constructor(props: EffectsPanelProps) {
    super(props);
  }

  toRowPair = (sheet: Sheet, effect: Effect) => {
    const isActive = effect.active;

    return (
      <tr key={effect.name}>
        <td>{effect.name}</td>
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
      </tr>
    );
  }

  render() {
    const { sheet, className } = this.props;
    const effects = sheet.effects;

    return (
      <SheetPanel
        title="Effects"
        className={className}>

        <table className="table table-bordered table-hover">

          <tbody>
            {effects.map(effect => this.toRowPair(sheet, effect))}
          </tbody>

        </table>
      </SheetPanel>
    );
  }
}

export default EffectsPanel;