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

        <table className="table table-bordered table-hover">

          <tbody>
            {sheet.abilities && sheet.abilities.map((a, i) => (
              <tr key={a.name}>
                <td style={{ width: '99%' }}>
                  <InlineEdit priorValue={a.name} onChange={n => updateAbility(i, a.updateName(n))} />
                  <br />
                  <DescriptionBox
                    className="text-muted small"
                    onChange={c => updateAbility(i, a.updateDescription(c))}
                    description={a.description} />
                </td>
                <td>
                  <SimpleInlineListEdit
                    placeholder="add action"
                    priorValue={a.actions}
                    onChange={actions => updateAbility(i, a.updateActions(actions))} />
                  </td>
                <td><DeleteButton onDelete={() => deleteAbility(a)} /></td>
              </tr>
            ))}
          </tbody>

        </table>

        <AddBox onAdd={name => addAbility(new Ability({ name }))} />

      </SheetPanel>
    );
  };

export default AbilitiesPanel;