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
    this.onUpdateRecharge = this.onUpdateRecharge.bind(this);
  }

  updateName(name: string) {
    this.props.update(Object.assign({}, this.props.resource, { name }));
  }

  updateCurrent(current: number) {
    this.props.update(Object.assign({}, this.props.resource, { current }));
  }

  onUpdateRecharge(recharge: Recharge) {
    const { resource } = this.props;

    const newRecharge = Object.assign({}, recharge);

    const oldRecharges = resource.recharge || [];
    const newRecharges = [...oldRecharges];
    const index = oldRecharges.findIndex(o => o.id === recharge.id);
    newRecharges[index] = newRecharge;

    this.props.update(Object.assign({}, resource, { recharge: newRecharges }));
  }

  onUpdateRechargeName(name: string, recharge: Recharge) {
    const { resource } = this.props;

    const newRecharge = Object.assign({}, recharge, { name });

    const oldRecharges = resource.recharge || [];
    const recharges = [...oldRecharges.filter(old => old.id !== recharge.id), newRecharge];

    this.props.update(Object.assign({}, resource, { recharge: recharges }));
  }

  onAddRecharge() {
    const { resource } = this.props;
    const oldRecharges = resource.recharge || [];

    const newId = nextId(oldRecharges);

    const recharges = [...oldRecharges, { id: newId }];

    this.props.update(Object.assign({}, resource, { recharge: recharges }));
  }

  onDeleteRecharge(recharge: Recharge) {
    const { resource } = this.props;

    const oldRecharges = resource.recharge || [];
    const recharges = oldRecharges.filter(old => old.id !== recharge.id);

    this.props.update(Object.assign({}, resource, { recharge: recharges }));
  }

  onDeleteFormula(recharge: Recharge, formula: Formula) {
    const oldFormulae = recharge.restorationFormulae;
    const newFormulae = oldFormulae.filter(o => o.id !== formula.id);
    const newRecharge = Object.assign({}, recharge, { restorationFormulae: newFormulae });

    this.onUpdateRecharge(newRecharge);
  }

  onUpdateFormula(value: string, recharge: Recharge, formula: Formula) {
    const newFormula: Formula = Object.assign({}, formula, { value });
    const oldFormulae = recharge.restorationFormulae;

    const newFormulae = [...oldFormulae];
    const replaceIndex = newFormulae.findIndex(f => f.id === formula.id);
    newFormulae[replaceIndex] = newFormula;

    const newRecharge = Object.assign({}, recharge, { restorationFormulae: newFormulae });

    this.onUpdateRecharge(newRecharge);
  }

  onAddFormula(recharge: Recharge) {
    const newId = nextId(recharge.restorationFormulae);

    const newFormula = { id: newId, value: '' };
    const oldFormulae = recharge.restorationFormulae;
    const newFormulae: Formula[] = [...oldFormulae, newFormula];
    const newRecharge = Object.assign({}, recharge, { restorationFormulae: newFormulae });

    this.onUpdateRecharge(newRecharge);
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