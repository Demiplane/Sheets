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

        <div
          className="list-group">
          {sheet.resolvedResources.map((resource, index) => (
            <div key={resource.name}
              className="list-group-item d-flex align-items-center">
              <div style={{ width: '100%' }}>
                <InlineEdit
                  priorValue={resource.name}
                  onChange={n => updateResource(index, resource.updateName(n))} />
                <br />
                <FormulaInlineEdit
                  priorFormula={resource.formula}
                  sheet={sheet}
                  className={'text-muted small'}
                  onChange={f => updateResource(index, resource.updateFormula(f))} />
              </div>
              <div className="pl-2 text-center">
                <span className="text-muted small">max</span>
                <br />
                {resource.value.toString()}
              </div>
              <div className="pl-2">
                <NumberInput
                  value={resource.current}
                  onChange={c => updateResource(index, resource.updateCurrent(c))} />
              </div>
              <div className="pl-2 hide-unless-hover">
                <DeleteButton onDelete={() => deleteResource(resource)} />
              </div>
            </div>
          ))}
        </div>

        <AddBox placeholder="add resource" onAdd={name => addResource(new Resource({ name }))} />

      </SheetPanel>
    );
  };

export default ResourcesPanel;