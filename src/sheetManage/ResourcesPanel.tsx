import * as React from 'react';
import Sheet from '../sheet/SheetModel';
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
            </tr>
          </thead>

          <tbody>
            {sheet.resolvedResources.map(i => (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td className="text-center">{i.value.toString()}</td>
                <td className="text-center">{i.current}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default ResourcesPanel;