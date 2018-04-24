import * as React from 'react';
import Sheet, { selectActions } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';
import SheetTable from './SheetTable';
// import groupBy from '../core/groupBy';

const ActionsPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    const actions = selectActions(sheet);
    // const flattenedByCost = actions
    //     .map(a => a.actionCost!.map(c => ({ cost: c, name: a.name, description: a.description })))
    //     .reduce((l, r) => l.concat(r));
    // const costGroups = groupBy(flattenedByCost, a => a.cost);

    return (
      <SheetPanel
        title="Actions"
        className={className}>
        <SheetTable fields={['Name', 'Cost', 'Description']}>
          {actions.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.actionCost && a.actionCost
                .sort()
                .reduce((l, r) => l + ' ' + r)}</td>
              <td><DescriptionBox description={a.description} /></td>
            </tr>
          ))}
        </SheetTable>
      </SheetPanel>
    );
  };

export default ActionsPanel;