import Sheet, { Statistic, Modifier, nextId } from '../sheet/SheetModel';
import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';

type StatisticFormProps = {
  sheet: Sheet;
  statistic: Statistic;
  save: (statistic: Statistic) => void;
  cancel: () => void;
};

type StatisticFormState = {
  statistic: Statistic;
};

export class StatisticForm extends React.Component<StatisticFormProps, StatisticFormState> {
  constructor(props: StatisticFormProps) {
    super(props);

    const { statistic } = props;

    this.state = { statistic: Object.assign({}, statistic) };

    this.onChangeName = this.onChangeName.bind(this);
    this.toModifierRow = this.toModifierRow.bind(this);
    this.onSave = this.onSave.bind(this);
    this.render = this.render.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  onChangeName(name: string) {
    this.setState({ statistic: Object.assign({}, this.state.statistic, { name }) });
  }

  onSave() {
    this.props.save(this.state.statistic);
  }

  onDelete(modifier: Modifier) {
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
        <td>
          <button
            onClick={event => { event.preventDefault(); this.onDelete(modifier); }}
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

  render() {
    let { cancel } = this.props;
    let { statistic } = this.state;

    return (
      <EditForm
        onCancel={cancel}
        onSave={this.onSave}
        header="Edit Statistic">
        <TextInput
          name="statisticName"
          label="Name"
          value={statistic.name}
          error=""
          onChange={this.updateName}
          placeholder="Enter a name"
        />
        <table className="table">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Source</th>
              <th>Formula</th>
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
      </EditForm>
    );
  }
}

export default StatisticForm;