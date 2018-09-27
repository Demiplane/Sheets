import * as React from 'react';
import combineClasses from './combineClasses';

class AddBox extends React.Component<
    { onAdd: (value: string) => void, classes?: string },
    { editValue: string }> {

    constructor(props: { onAdd: (value: string) => void, classes?: string }) {
        super(props);

        this.onInputKeyUp = this.onInputKeyUp.bind(this);
        this.add = this.add.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChangeNewText = this.onChangeNewText.bind(this);

        this.state = {
            editValue: ''
        };
    }

    onInputKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.key === 'Enter') {
            this.add(this.state.editValue);
        }
    }

    add(text: string) {
        this.props.onAdd(text);
        this.setState({ editValue: '' });
    }

    onAdd(event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        this.add(this.state.editValue);
    }

    onChangeNewText(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({ editValue: event.currentTarget.value });
        event.stopPropagation();
    }

    render() {
        const classes = combineClasses(this.props.classes, 'input-group');

        return (
            <div className={classes}>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.editValue}
                    onChange={this.onChangeNewText}
                    onKeyUp={this.onInputKeyUp} />
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" onClick={this.onAdd} type="button">Add</button>
                </div>
            </div>
        );
    }

}

export default AddBox;