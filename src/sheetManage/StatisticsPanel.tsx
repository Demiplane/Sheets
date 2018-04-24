import * as React from 'react';
import Sheet, { calculateValue } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import SheetTable from './SheetTable';

const StatisticsPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Statistics"
        className={className}>
        <SheetTable fields={['Name', 'Value']}>
          {sheet.statistics && sheet.statistics.map(s => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td className="text-center">{calculateValue(sheet, s)}</td>
            </tr>
          ))}
        </SheetTable>
      </SheetPanel>
    );
  };

export default StatisticsPanel;