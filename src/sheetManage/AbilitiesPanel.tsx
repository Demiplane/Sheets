import * as React from 'react';
import Sheet, { Ability } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import SimpleInlineListEdit from '../controls/SimpleInlineListEdit';
import InlineEdit from '../controls/InlineEdit';
import MegaTable from '../controls/MegaTable';

class Table extends MegaTable<Ability> { }

const AbilitiesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateAbility: (index: number, ability: Ability) => void,
  addAbility: (ability: Ability) => void,
  deleteAbility: (ability: Ability) => void,
  reorder: (from: number, to: number) => void
}> =
  ({ reorder, className, sheet, deleteAbility, updateAbility, addAbility }) => {

    return (
      <SheetPanel
        title="Abilities"
        className={className}>

        <Table
          addPlaceholder="add ability"
          searchTerms={ability => [ability.name, ...ability.actions]}
          items={sheet.abilities}
          add={name => addAbility(new Ability({ name }))}
          remove={item => deleteAbility(item)}
          keySelector={a => a.name}
          move={(from, to) => reorder(from, to)}
          render={(index, a) =>
            [(
              <div key={a.name + 'name'} style={{ width: '100%' }}>
                <InlineEdit priorValue={a.name} onChange={n => updateAbility(index, a.updateName(n))} />
                <br />
                <DescriptionBox
                  className="text-muted small"
                  onChange={c => updateAbility(index, a.updateDescription(c))}
                  description={a.description} />
              </div>
            ), (
              <div key={a.name + 'actions'} className="pl-2">
                <SimpleInlineListEdit
                  placeholder="add action"
                  priorValue={a.actions}
                  onChange={actions => updateAbility(index, a.updateActions(actions))} />
              </div>
            )]}
        />
      </SheetPanel>
    );
  };

export default AbilitiesPanel;