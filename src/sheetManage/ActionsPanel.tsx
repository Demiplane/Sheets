import * as React from 'react';
import groupBy from '../core/groupBy';
import Sheet, { selectActions } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DetailBox from '../controls/DetailBox';

const renderAction = (item: { name?: string, description?: string }) => {
  return (
    <DetailBox name={item.name!} description={item.description} />
  );
};

const toActionTable = (group: { key: string, items: { name?: string, description?: string }[] }) => {
  return (
    <div>
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
    const actions = selectActions(sheet);
    const flattenedByCost = actions
      .map(a => a.actionCost!.map(c => ({ cost: c, name: a.name, description: a.description })))
      .reduce((l, r) => l.concat(r));
    const costGroups = groupBy(flattenedByCost, a => a.cost);

    return (
      <SheetPanel
        title="Actions"
        className={className}>

        {costGroups.map(cg => toActionTable(cg))}

      </SheetPanel>
    );
  };

export default ActionsPanel;