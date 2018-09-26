import * as React from 'react';
import Sheet, { Ability } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';

const AbilitiesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateAbility: (index: number, ability: Ability) => void
}> =
  ({ className, sheet, updateAbility }) => {
    return (
      <SheetPanel
        title="Abilities"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

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
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default AbilitiesPanel;