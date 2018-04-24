import * as React from 'react';
import Sheet, { selectResources } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import SheetTable from './SheetTable';

const ResourcesPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Resources"
        className={className}>
        <SheetTable fields={['Name', 'Maximum', 'Current', 'Recharge']}>
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
        </SheetTable>
      </SheetPanel>
    );
  };

export default ResourcesPanel;