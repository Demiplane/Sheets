import { Statistic, Modifier } from '../sheet/SheetModel';
import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';

type StatisticFormProps = {
  statistic?: Statistic;
  saveStatistic: (statistic: Statistic) => void;
  cancel: () => void;
};

type StatisticFormState = {
  statistic: Statistic;
};

export class StatisticForm extends React.Component<StatisticFormProps, StatisticFormState> {
  constructor(props: StatisticFormProps) {
    super(props);

    this.state = { statistic: Object.assign({}, props.statistic || this.newStatistic()) };

    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  newStatistic(): Statistic {
    return {
      name: ''
    };
  }

  onChangeName(event: React.FormEvent<HTMLInputElement>) {
    this.setState(Object.assign(this.state, { name: event.currentTarget.value }));
  }

  onSave() {
    this.props.saveStatistic(this.state.statistic);
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
      </tr>
    );
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
        <table>
          <thead>
            <tr>
              <th>Condition</th>
              <th>Source</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            {statistic.modifiers && statistic.modifiers.map(this.toModifierRow)}
          </tbody>
        </table>
      </EditForm>
    );
  }
}

export default StatisticForm;