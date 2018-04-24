import * as React from 'react';
import Sheet, { calculateValue } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

const StatisticsPanel: React.StatelessComponent<{ className?: string, sheet: Sheet }> =
  ({ className, sheet }) => {
    return (
      <SheetPanel
        title="Statistics"
        className={className}>

        <table className="table table-bordered table-hover">

          <thead>
            <tr>
              <th scope="col">Name</th>
              <th className="text-center" scope="col">Value</th>
            </tr>
          </thead>

          <tbody>
            {sheet.statistics && sheet.statistics.map(s => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td className="text-center">{calculateValue(sheet, s)}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default StatisticsPanel;