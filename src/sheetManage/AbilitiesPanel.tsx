import * as React from 'react';
import Sheet, { Ability } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import SimpleInlineListEdit from '../controls/SimpleInlineListEdit';
import InlineEdit from '../controls/InlineEdit';

const AbilitiesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateAbility: (index: number, ability: Ability) => void,
  addAbility: (ability: Ability) => void,
  deleteAbility: (ability: Ability) => void
}> =
  ({ className, sheet, deleteAbility, updateAbility, addAbility }) => {
    return (
      <SheetPanel
        title="Abilities"
        className={className}>

        <div
          className="list-group">
          {sheet.abilities && sheet.abilities.map((a, i) => (
            <div key={a.name}
              className="list-group-item d-flex align-items-center">
              <div style={{ width: '100%' }}>
                <InlineEdit priorValue={a.name} onChange={n => updateAbility(i, a.updateName(n))} />
                <br />
                <DescriptionBox
                  className="text-muted small"
                  onChange={c => updateAbility(i, a.updateDescription(c))}
                  description={a.description} />
              </div>
              <div className="pl-2">
                <SimpleInlineListEdit
                  placeholder="add action"
                  priorValue={a.actions}
                  onChange={actions => updateAbility(i, a.updateActions(actions))} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <DeleteButton onDelete={() => deleteAbility(a)} />
              </div>
            </div>
          ))}
        </div>

        <AddBox placeholder="add ability" onAdd={name => addAbility(new Ability({ name }))} />

      </SheetPanel>
    );
  };

export default AbilitiesPanel;