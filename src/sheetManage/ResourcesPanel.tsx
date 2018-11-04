import * as React from 'react';
import Sheet, { Resource, ResolvedResource } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import NumberInput from '../controls/NumberInput';
import FormulaInlineEdit from '../controls/FormulaInlineEdit';
import MegaTable from '../controls/MegaTable';

class Table extends MegaTable<ResolvedResource> { }

const ResourcesPanel: React.StatelessComponent<{
  className?: string,
  sheet: Sheet,
  updateResource: (index: number, resource: Resource) => void,
  deleteResource: (resource: Resource) => void,
  addResource: (resource: Resource) => void,
  reorder: (from: number, to: number) => void
}> =
  ({ reorder, className, sheet, updateResource, addResource, deleteResource }) => {
    return (
      <SheetPanel
        title="Resources"
        className={className}>

        <Table
          searchTerms={resource => [resource.name]}
          items={sheet.resolvedResources}
          add={name => addResource(new Resource({ name }))}
          addPlaceholder="add resource"
          keySelector={resource => resource.name}
          move={(from, to) => reorder(from, to)}
          remove={resource => deleteResource(resource)}
          render={(index, resource) => [
            (
              <div key={resource.name + 'name'} style={{ width: '100%' }}>
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
            ), (
              <div key={resource.name + 'max'} className="pl-2 text-center">
                <span className="text-muted small">max</span>
                <br />
                {resource.value.toString()}
              </div>
            ), (
              <div key={resource.name + 'current'} className="pl-2">
                <NumberInput
                  value={resource.current}
                  onChange={c => updateResource(index, resource.updateCurrent(c))} />
              </div>
            )
          ]}
        />

      </SheetPanel>
    );
  };

export default ResourcesPanel;