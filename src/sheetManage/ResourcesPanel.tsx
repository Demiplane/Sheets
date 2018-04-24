import * as React from 'react';
import Sheet, { selectResources } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

const ResourcesPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Resources"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">Maximum</th>
              <th className="text-center" scope="col">Current</th>
              <th scope="col">Recharge</th>
            </tr>
          </thead>

          <tbody>
            {selectResources(sheet).map(i => (
              <tr key={i.resource.name}>
                <td>{i.resource.name}</td>
                <td className="text-center">{i.maximum}</td>
                <td className="text-center">{i.resource.current}</td>
                <td>{i.resource.recharge && i.resource.recharge
                  .map(r => r.name)
                  .reduce((l, r) => l + ' ' + r)}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default ResourcesPanel;