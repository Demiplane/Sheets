import * as React from 'react';
import Sheet, { Resource } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import NumberInput from '../controls/NumberInput';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';

const ResourcesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateResource: (index: number, resource: Resource) => void
}> =
  ({ className, sheet, updateResource }) => {
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
            {sheet.resolvedResources.map((resource, index) => (
              <tr key={resource.name}>
                <td style={{ width: '99%' }}>
                  <InlineEdit
                    priorValue={resource.name}
                    onChange={n => updateResource(index, resource.updateName(n))} />
                  <br />
                  <FormulaInlineEdit
                    priorFormula={resource.formula}
                    sheet={sheet}
                    className={'text-muted small'}
                    onChange={f => updateResource(index, resource.updateFormula(f))} />
                </td>
                <td className="text-center">{resource.value.toString()}</td>
                <td className="text-center">
                  <NumberInput
                    value={resource.current}
                    onChange={c => updateResource(index, resource.updateCurrent(c))} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </SheetPanel>
    );
  };

export default ResourcesPanel;