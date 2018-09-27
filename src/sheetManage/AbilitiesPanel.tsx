import * as React from 'react';
import Sheet, { Ability } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';

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
                  <DescriptionBox
                    onChange={c => updateAbility(i, a.updateDescription(c))}
                    description={a.description} />
                </td>
                <td>{a.actions && a.actions
                  .sort()
                  .reduce((l, r) => l + ' ' + r, '')}</td>
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