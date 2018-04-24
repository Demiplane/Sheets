import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import DescriptionBox from '../controls/DescriptionBox';

const AbilitiesPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Abilities"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
              <th scope="col">Source</th>
              <th scope="col">Description</th>
            </tr>
          </thead>

          <tbody>
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
          </tbody>
          
        </table>

      </SheetPanel>
    );
  };

export default AbilitiesPanel;