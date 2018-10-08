import * as React from 'react';
import groupBy from '../core/groupBy';
import Sheet, { Action } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

const toActionTable = (group: { key: string, items: Action[] }) => {
  return (
    <div key={group.key} className="card p-4 mt-2">
      <h2>{group.key}</h2>
      <div className="list-group">
        {group.items.map(i => <p key={i.name} className="list-group-item">{i.name}</p>)}
      </div>
    </div>
  );
};

const ActionsPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    const actions = sheet.actions;
    const costGroups = groupBy(actions, a => a.cost);

    return (
      <SheetPanel
        title="Actions"
        className={className}>

        {costGroups.map(cg => toActionTable(cg))}

      </SheetPanel>
    );
  };

export default ActionsPanel;