import * as React from 'react';
import Sheet, { Ability } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';
import SimpleInlineListEdit from '../controls/SimpleInlineListEdit';
import InlineEdit from '../controls/InlineEdit';
import UpDown from '../controls/UpDown';

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

        <div
          className="list-group">
          {sheet.abilities && sheet.abilities.map((a, index) => (
            <div key={a.name}
              className="list-group-item d-flex align-items-center">
              <div style={{ width: '100%' }}>
                <InlineEdit priorValue={a.name} onChange={n => updateAbility(index, a.updateName(n))} />
                <br />
                <DescriptionBox
                  className="text-muted small"
                  onChange={c => updateAbility(index, a.updateDescription(c))}
                  description={a.description} />
              </div>
              <div className="pl-2">
                <SimpleInlineListEdit
                  placeholder="add action"
                  priorValue={a.actions}
                  onChange={actions => updateAbility(index, a.updateActions(actions))} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <DeleteButton onDelete={() => deleteAbility(a)} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <UpDown
                  onUp={() => reorder(index, index - 1)}
                  onDown={() => reorder(index, index + 1)} />
              </div>
            </div>
          ))}
        </div>

        <AddBox placeholder="add ability" onAdd={name => addAbility(new Ability({ name }))} />

      </SheetPanel>
    );
  };

export default AbilitiesPanel;