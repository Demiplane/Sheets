import * as React from 'react';
import combineClases from './combineClasses';

type SimpleInlineListEditProps = {
    priorValue: string[],
    onChange: (newValue: string[]) => void,
    placeholder?: string,
    className?: string
};

export default class SimpleInlineListEdit
    extends React.Component<SimpleInlineListEditProps, {
        focus: boolean,
        editValue: string[],
        focusedIndex: number
    }> {

    inputTable: React.RefObject<HTMLTableElement>;

    constructor(props: SimpleInlineListEditProps) {
        super(props);

        this.state = { focus: false, editValue: props.priorValue, focusedIndex: 0 };

        this.inputTable = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.goToEditMode = this.goToEditMode.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.commit = this.commit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.leaveEditState = this.leaveEditState.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.add = this.add.bind(this);
    }

    removeRow(index: number) {

        const newData = [...this.state.editValue];
        newData.splice(index, 1);

        this.setState({ editValue: newData });
    }

    goToEditMode(event: React.FormEvent<HTMLSpanElement>, index: number) {

        const newEditValue = this.props.priorValue.length > 0 ? this.props.priorValue : [''];

        this.setState({ focus: true, editValue: newEditValue, focusedIndex: index });
    }

    onChange(event: React.FormEvent<HTMLInputElement>, index: number) {

        const newData = this.state.editValue;
        newData[index] = event.currentTarget.value;

        this.setState({ editValue: newData });
    }

    add(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();

        const newData = this.state.editValue;
        newData.push('');

        this.setState({ editValue: newData });
    }

    commit(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.commitChanges(this.state.editValue);
    }

    cancel(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.leaveEditState();
    }

    leaveEditState() {
        this.setState({ focus: false, editValue: this.props.priorValue });
    }

    onBlur(event: React.FormEvent<HTMLDivElement>) {

        const currentTarget = event.currentTarget;

        const self = this;

        // hackity hack
        setTimeout(function () {
            if (!currentTarget.contains(document.activeElement)) {
                self.leaveEditState();
            }
        }, 0);

    }

    handleFocus(event: React.FormEvent<HTMLInputElement>) {
        event.currentTarget.select();
    }

    componentDidUpdate() {
        if (this.state.focus) {

            const element = this.inputTable.current;

            if (element && this.state.focusedIndex > 0) {

                element.tBodies[0].rows[this.state.focusedIndex].cells[0].focus();

                this.setState({ focusedIndex: -1 });

            }
        }
    }

    commitChanges(newValue: string[]) {
        this.setState({ focus: false });
        this.props.onChange(newValue);
    }

    onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.commitChanges(this.state.editValue);
        }
    }

    render() {

        if (this.state.focus) {
            const inputClasses = combineClases('input-group', this.props.className);

            return (
                <div className={inputClasses} onBlur={this.onBlur}>
                    {this.state.editValue.map((v, i) =>
                        <div
                            key={i}
                            style={{ minWidth: '200px' }}
                            className="input-group input-group-sm">
                            <input
                                className="form-control"
                                value={v}
                                onChange={e => this.onChange(e, i)}
                                onKeyUp={this.onKeyUp}
                                onFocus={this.handleFocus} />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={e => {
                                        e.preventDefault();
                                        this.removeRow(i);
                                    }}
                                    type="button">🗙</button>
                            </div>
                        </div>
                    )}

                    <div className="btn-group float-right">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={this.add}
                            type="button">＋</button>
                        <button
                            className="btn btn-sm btn-outline-success"
                            onClick={this.commit} type="button">✓</button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={this.cancel}
                            type="button">🗙</button>
                    </div>
                </div >);
        } else if (this.props.priorValue.length > 0) {

            const spanClasses = combineClases('clickable list-group', this.props.className);

            return (
                <ul className={spanClasses}>
                    {this.props.priorValue.map((v, i) =>
                        <li
                            className="list-group-item"
                            key={v}
                            onClick={e => this.goToEditMode(e, i)}>{v}</li>)}
                </ul>
            );
        } else {

            const spanClasses = combineClases('clickable text-center text-muted', this.props.className);

            return (
                <p className={spanClasses}
                    onClick={e => this.goToEditMode(e, -1)}
                >{this.props.placeholder ? this.props.placeholder : 'none'}</p>
            );
        }
    }
}