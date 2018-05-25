import Sheet, { nextId, Recharge, Resource, Formula, calculateFormula } from '../sheet/SheetModel';
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
    this.toRechargeRow = this.toRechargeRow.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.onUpdateRechargeName = this.onUpdateRechargeName.bind(this);
    this.onAddRecharge = this.onAddRecharge.bind(this);
    this.onDeleteRecharge = this.onDeleteRecharge.bind(this);
    this.onDeleteFormula = this.onDeleteFormula.bind(this);
    this.onUpdateFormula = this.onUpdateFormula.bind(this);
    this.onAddFormula = this.onAddFormula.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.setState(Object.assign({}, this.state));
  }

  updateName(name: string) {
    this.props.resource.name = name;

    this.refresh();
  }

  updateCurrent(current: number) {
    this.props.resource.current = current;

    this.refresh();
  }

  onUpdateRechargeName(name: string, recharge: Recharge) {
    recharge.name = name;

    this.refresh();
  }

  onAddRecharge() {
    const { resource } = this.props;

    const recharge = resource.recharge || [];

    const newId = nextId(recharge);
    const newRecharge = { id: newId, name: '', restorationFormulae: [] };

    resource.recharge = [...recharge, newRecharge];

    this.refresh();
  }

  onDeleteRecharge(recharge: Recharge) {
    const { resource } = this.props;

    const recharges = resource.recharge || [];
    resource.recharge = recharges.filter(old => old.id !== recharge.id);

    this.refresh();
  }

  onDeleteFormula(recharge: Recharge, formula: Formula) {
    recharge.restorationFormulae =
      recharge.restorationFormulae.filter(old => old.id !== formula.id);

    this.refresh();
  }

  onUpdateFormula(value: string, recharge: Recharge, formula: Formula) {
    formula.value = value;

    this.refresh();
  }

  onAddFormula(recharge: Recharge) {

    recharge.restorationFormulae = [
      ...recharge.restorationFormulae,
      { id: nextId(recharge.restorationFormulae), value: '' }];

    this.refresh();
  }

  toRechargeRow(recharge: Recharge) {
    return (
      <tr>
        <td>
          <TextInput
            name="rechargeName"
            value={recharge.name}
            error=""
            onChange={value => this.onUpdateRechargeName(value, recharge)}
            placeholder="Enter a recharge rate name"
          />
        </td>
        <td>
          <table>
            <tbody>
              {recharge.restorationFormulae.map((f, i) => (
                <tr key={i.toString()}>
                  <td>
                    <TextInput
                      value={f.value}
                      onChange={value => this.onUpdateFormula(value, recharge, f)}
                      placeholder="Enter a formula"
                    />
                  </td>
                  <td className="text-muted">
                    ({calculateFormula(this.props.sheet, f.value)})
                  </td>
                  <td>
                    <button
                      onClick={event => { event.preventDefault(); this.onDeleteFormula(recharge, f); }}
                      className="btn btn-small btn-outline-danger">X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={event => { event.preventDefault(); this.onAddFormula(recharge); }}
            className="btn btn-small btn-outline-primary">Add Formula</button>
        </td>
        <td>
          <button
            onClick={event => { event.preventDefault(); this.onDeleteRecharge(recharge); }}
            className="btn btn-small btn-outline-danger">X</button>
        </td>
      </tr>
    );
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
        <NumberInput
          name="resourceCurrent"
          label="Current Value"
          value={resource.current || 0}
          onChange={this.updateCurrent}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Recharge Rate Name</th>
              <th>Formulae</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {resource.recharge ? resource.recharge.map(r => this.toRechargeRow(r)) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ResourceFormParts;