import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';

type RenameFormProps = {
  name: string;
  header?: string;
  save: (name: string) => void;
  cancel: () => void;
};

type RenameFormState = {
  name: string;
};

export class RenameForm extends React.Component<RenameFormProps, RenameFormState> {
  constructor(props: RenameFormProps) {
    super(props);

    const { name } = props;

    this.state = { name };

    this.onSave = this.onSave.bind(this);
    this.render = this.render.bind(this);
  }

  onSave() {
    this.props.save(this.state.name);
  }

  render() {
    return (
      <EditForm
        onCancel={this.props.cancel}
        onSave={this.onSave}
        header={this.props.header || 'Rename'}
      >
        <TextInput
          name="name"
          value={this.state.name}
          error=""
          onChange={name => this.setState({ name })}
          placeholder="Enter a name"
        />
      </EditForm>
    );
  }
}

export default RenameForm;