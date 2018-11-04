import * as React from 'react';
import Sheet, { Effect, Target } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import MegaTable from '../controls/MegaTable';

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

class EffectTable extends MegaTable<Effect> { }
class TargetTable extends MegaTable<Target> { }

class EffectsPanel extends React.Component<EffectsPanelProps> {
  constructor(props: EffectsPanelProps) {
    super(props);
  }

  render() {
    const { sheet, className } = this.props;
    const effects = sheet.effects;

    return (
      <SheetPanel
        title="Effects"
        className={className}>

        <EffectTable
          addPlaceholder="add effect"

          items={effects}
          keySelector={e => e.name}
          add={name => this.props.addEffect(new Effect({ name }))}
          remove={effect => this.props.deleteEffect(effect)}
          move={(from, to) => this.props.reorder(from, to)}
          render={(index, effect) => [
            (
              <div style={{ width: '100%' }}>
                <InlineEdit
                  priorValue={effect.name}
                  onChange={v => this.props.updateEffect(index, effect.updateName(v))} />
              </div>
            ),
            (
              <div className="pl-2">
                <button
                  className={'btn btn-small ' + (effect.active ? 'btn-primary' : '')}
                  onClick={event => {
                    event.preventDefault();
                    effect.active ? this.props.inactivateEffect(effect) : this.props.activateEffect(effect);
                  }}>
                  {effect.active ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>
            )
          ]}
          expand={effect => (
            <TargetTable
              addPlaceholder="add target"
  
              key={effect.name + 'expando'}
              items={effect.targets}
              add={name => effect.addTarget(new Target({ name }))}
              remove={target => effect.deleteTarget(target)}
              render={(index, target) => [
                (
                  <div>
                    <InlineEdit
                      priorValue={target.statisticName}
                      onChange={n => this.props.updateEffect(
                        index,
                        effect.updateTarget(index, target.updateName(n)))} />
                  </div>
                ),
                (
                  <div>
                    <FormulaInlineEdit
                      className="text-muted small"
                      priorFormula={target.formula}
                      sheet={sheet}
                      onChange={n => this.props.updateEffect(
                        index,
                        effect.updateTarget(index, target.updateFormula(n)))} />
                  </div>
                )
              ]}
            />
          )}
        />

      </SheetPanel>
    );
  }
}

export default EffectsPanel;