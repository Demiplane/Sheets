import * as React from 'react';
import Sheet, { Resource } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import NumberInput from '../controls/NumberInput';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';

const ResourcesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateResource: (index: number, resource: Resource) => void,
  deleteResource: (resource: Resource) => void,
  addResource: (resource: Resource) => void
}> =
  ({ className, sheet, updateResource, addResource, deleteResource }) => {
    return (
      <SheetPanel
        title="Resources"
        className={className}>

        <table className="table table-bordered table-hover">

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
                <td className="text-center">
                  <span className="text-muted small">max</span>
                  <br />
                  {resource.value.toString()}
                </td>
                <td className="text-center">
                  <NumberInput
                    value={resource.current}
                    onChange={c => updateResource(index, resource.updateCurrent(c))} />
                </td>
                <td>
                  <DeleteButton onDelete={() => deleteResource(resource)} />
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        <AddBox onAdd={name => addResource(new Resource({ name }))} />

      </SheetPanel>
    );
  };

export default ResourcesPanel;