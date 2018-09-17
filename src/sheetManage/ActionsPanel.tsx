import * as React from 'react';
import groupBy from '../core/groupBy';
import Sheet, { Action } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

const renderAction = (item: Action) => {
  return (
    <p>{item.name}</p>
  );
};

const toActionTable = (group: { key: string, items: Action[] }) => {
  return (
    <div key={group.key}>
      <h2>{group.key}</h2>
      <table className="table table-bordered table-hover">
        <tbody>
          {group.items.map(i => <tr key={i.name}><td>{renderAction(i)}</td></tr>)}
        </tbody>
      </table>
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