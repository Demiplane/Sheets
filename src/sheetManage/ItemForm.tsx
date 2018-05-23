import * as React from 'react';
import TextInput from '../controls/TextInput';
import EditForm from '../controls/EditForm';
import { Item } from '../sheet/SheetModel';
import NumberInput from '../controls/NumberInput';

type ItemFormProps = {
  item: Item;
  header?: string;
  save: (item: Item) => void;
  cancel: () => void;
};

type ItemFormState = {
  item: Item;
};

export class ItemForm extends React.Component<ItemFormProps, ItemFormState> {
  constructor(props: ItemFormProps) {
    super(props);

    const { item } = props;

    this.state = { item };

    this.onSave = this.onSave.bind(this);
    this.render = this.render.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateStock = this.updateStock.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  onSave() {
    this.props.save(this.state.item);
  }

  updateName(name: string) {
    this.setState({ item: Object.assign({}, this.state.item, { name }) });
  }

  updateStock(stock: number) {
    this.setState({ item: Object.assign({}, this.state.item, { stock }) });
  }

  updateDescription(description: string) {
    this.setState({ item: Object.assign({}, this.state.item, { description }) });
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
          label="Name"
          value={this.state.item.name}
          error=""
          onChange={this.updateName}
          placeholder="Enter a name"
        />
        <NumberInput
          name="stock"
          label="Stock"
          value={this.state.item.stock}
          onChange={this.updateStock}
        />
        <TextInput
          name="description"
          label="Description"
          value={this.state.item.description}
          error=""
          onChange={this.updateDescription}
          placeholder="Enter a name"
        />
      </EditForm>
    );
  }
}

export default ItemForm;