import Sheet, { Statistic, Modifier } from '../sheet/SheetModel';
import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';

type StatisticFormProps = {
  sheet: Sheet;
  statistic?: Statistic;
  addStatistic: (statistic: Statistic) => void;
  updateStatistic: (statistic: Statistic) => void;
  cancel: () => void;
};

type StatisticFormState = {
  statistic: Statistic;
  add: boolean;
};

export class StatisticForm extends React.Component<StatisticFormProps, StatisticFormState> {

  constructor(props: StatisticFormProps) {
    super(props);

    const add = !props.statistic;

    this.state = { add, statistic: Object.assign({}, add ? this.newStatistic() : props.statistic) };

    this.onChangeName = this.onChangeName.bind(this);
    this.toModifierRow = this.toModifierRow.bind(this);
    this.onSave = this.onSave.bind(this);
    this.render = this.render.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  newStatistic(): Statistic {
    return {
      name: ''
    };
  }

  onChangeName(newValue: string) {
    this.setState(Object.assign(this.state, { name: newValue }));
  }

  onSave() {
    this.state.add
      ? this.props.addStatistic(this.state.statistic)
      : this.props.updateStatistic(this.state.statistic);
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

  toModifierRow(modifier: Modifier) {
    return (
      <tr>
        <td>
          <TextInput
            name="modifierCondition"
            value={modifier.condition}
            error=""
            onChange={this.onChangeName}
            placeholder="Enter a condition"
          />
        </td>
        <td>
          <TextInput
            name="modifierSource"
            value={modifier.source}
            error=""
            onChange={this.onChangeName}
            placeholder="Enter a source"
          />
        </td>
        <td>
          <TextInput
            name="modifierFormula"
            value={modifier.formula}
            error=""
            onChange={this.onChangeName}
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
    const { statistic } = this.state;
    const oldModifiers = statistic.modifiers || [];
    const maxId = Math.max(...oldModifiers.map(old => old.id));
    const newId = maxId + 1;
    const newModifiers = [...oldModifiers, { id: newId }];
    this.setState({
      statistic: Object.assign(
        this.state.statistic,
        { modifiers: newModifiers })
    });
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
          onChange={this.onChangeName}
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