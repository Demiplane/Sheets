import Sheet, { Statistic, Modifier, nextId, Resource, calculateFormula } from '../sheet/SheetModel';
import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';
import ResourceFormParts from './ResourceFormParts';
import CheckBoxInput from '../controls/CheckBoxInput';

type StatisticFormProps = {
  sheet: Sheet;
  statistic: Statistic;
  save: (statistic: Statistic) => void;
  cancel: () => void;
};

type StatisticFormState = {
  statistic: Statistic;
  showResourceForm: boolean;
};

export class StatisticForm extends React.Component<StatisticFormProps, StatisticFormState> {
  constructor(props: StatisticFormProps) {
    super(props);

    const { statistic } = props;

    this.state = {
      statistic: Object.assign({}, statistic),
      showResourceForm: statistic.resource ? true : false
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.toModifierRow = this.toModifierRow.bind(this);
    this.onSave = this.onSave.bind(this);
    this.render = this.render.bind(this);
    this.onDeleteModifier = this.onDeleteModifier.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateResourceCheck = this.updateResourceCheck.bind(this);
    this.updateResource = this.updateResource.bind(this);
    this.renderModifierFormParts = this.renderModifierFormParts.bind(this);
    this.renderResourceFormParts = this.renderResourceFormParts.bind(this);
    this.renderStatisticFormParts = this.renderStatisticFormParts.bind(this);
  }

  onChangeName(name: string) {
    this.setState({ statistic: Object.assign({}, this.state.statistic, { name }) });
  }

  onSave() {
    const statistic = this.state.statistic;

    statistic.resource = this.state.showResourceForm ? statistic.resource : undefined;

    this.props.save(statistic);
  }

  onDeleteModifier(modifier: Modifier) {
    const { statistic } = this.state;
    const oldModifiers = statistic.modifiers || [];
    const newModifiers = oldModifiers.filter(old => old.id !== modifier.id);
    this.setState({
      statistic: Object.assign(
        this.state.statistic,
        { modifiers: newModifiers })
    });
  }

  refresh() {
    this.setState(this.state);
  }

  toModifierRow(modifier: Modifier) {
    return (
      <tr>
        <td>
          <TextInput
            name="modifierCondition"
            value={modifier.condition}
            error=""
            onChange={s => { modifier.condition = s; this.refresh(); }}
            placeholder="Enter a condition"
          />
        </td>
        <td>
          <TextInput
            name="modifierSource"
            value={modifier.source}
            error=""
            onChange={s => { modifier.source = s; this.refresh(); }}
            placeholder="Enter a source"
          />
        </td>
        <td>
          <TextInput
            name="modifierFormula"
            value={modifier.formula}
            error=""
            onChange={s => { modifier.formula = s; this.refresh(); }}
            placeholder="Enter a formula"
          />
        </td>
        <td className="text-muted">
          ({calculateFormula(this.props.sheet, modifier.formula)})
        </td>
        <td>
          <button
            onClick={event => { event.preventDefault(); this.onDeleteModifier(modifier); }}
            className="btn btn-small btn-outline-danger">X</button>
        </td>
      </tr>
    );
  }

  onAddNew() {
    const modifiers = this.state.statistic.modifiers || [];

    const newModifiers = [...modifiers, { id: nextId(this.props.sheet.statistics) }];
    this.setState({
      statistic: Object.assign(
        this.state.statistic,
        { modifiers: newModifiers })
    });
  }

  updateName(name: string) {
    this.setState({ statistic: Object.assign({}, this.state.statistic, { name }) });
  }

  updateResourceCheck(checked: boolean) {
    const { statistic } = this.state;

    if (checked) {
      statistic.resource = statistic.resource || { name: statistic.name };
    }

    this.setState({
      statistic,
      showResourceForm: checked
    });
  }

  renderModifierFormParts() {
    const { statistic } = this.state;

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Source</th>
              <th>Formula</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {statistic.modifiers && statistic.modifiers.map(this.toModifierRow)}
          </tbody>
        </table>
        <button
          onClick={event => { event.preventDefault(); this.onAddNew(); }}
          className="btn btn-small btn-outline-primary btn-block mt-2 mb-2">+</button>
      </div>
    );
  }

  renderStatisticFormParts() {
    const { statistic } = this.state;

    return (
      <TextInput
        name="statisticName"
        label="Name"
        value={statistic.name}
        error=""
        onChange={this.updateName}
        placeholder="Enter a name"
      />
    );
  }

  updateResource(resource: Resource) {
    const statistic = Object.assign({}, this.state.statistic, { resource });

    this.setState(Object.assign({}, this.state, { statistic }));
  }

  renderResourceFormParts(resource: Resource) {
    return (
      <div>
        <CheckBoxInput
          name="includeresourcecheck"
          checked={this.state.showResourceForm}
          label="Include Resource?"
          onChange={this.updateResourceCheck} />
        <ResourceFormParts
          resource={resource}
          update={this.updateResource}
          sheet={this.props.sheet}
        />
      </div>
    );
  }

  render() {
    const { cancel } = this.props;
    const { resource } = this.state.statistic;

    return (
      <EditForm
        onCancel={cancel}
        onSave={this.onSave}
        header="Edit Statistic">

        {this.renderStatisticFormParts()}

        {this.renderModifierFormParts()}

        {resource && this.renderResourceFormParts(resource)}
      </EditForm>
    );
  }
}

export default StatisticForm;