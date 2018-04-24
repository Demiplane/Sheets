import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import SheetTable from './SheetTable';

const AbilitiesPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Abilities"
        className={className}>
        <SheetTable fields={['Name', 'Action', 'Source', 'Description']}>
          {sheet.abilities && sheet.abilities.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.actionCost && a.actionCost
                .sort()
                .reduce((l, r) => l + ' ' + r)}</td>
              <td>{a.source}</td>
              <td><DescriptionBox description={a.description} /></td>
            </tr>
          ))}
        </SheetTable>
      </SheetPanel>
    );
  };

export default AbilitiesPanel;