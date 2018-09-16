import Sheet, { Resource } from '../sheet/SheetModel';
import * as React from 'react';
import TextInput from '../controls/TextInput';
import NumberInput from '../controls/NumberInput';

type ResourceFormPartsProps = {
  sheet: Sheet;
  resource: Resource;
  update: (resource: Resource) => void;
};

export class ResourceFormParts extends React.Component<ResourceFormPartsProps> {
  constructor(props: ResourceFormPartsProps) {
    super(props);

    this.render = this.render.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.setState(Object.assign({}, this.state));
  }

  updateName(name: string) {
    this.props.resource.name = name;

    this.refresh();
  }

  updateFormula(formula: string) {
    this.props.resource.formula = formula;

    this.refresh();
  }

  updateCurrent(current: number) {
    this.props.resource.current = current;

    this.refresh();
  }

  render() {
    const { resource } = this.props;

    return (
      <div className="form-row">
        <TextInput
          name="resourceName"
          label="Resource Name"
          value={resource.name}
          error=""
          onChange={this.updateName}
          placeholder="Enter a name"
        />
        <TextInput
          name="resourceName"
          label="Resource Name"
          value={resource.formula}
          error=""
          onChange={this.updateFormula}
          placeholder="Enter a name"
        />
        <NumberInput
          name="resourceCurrent"
          label="Current Value"
          value={resource.current || 0}
          onChange={this.updateCurrent}
        />
        
      </div>
    );
  }
}

export default ResourceFormParts;