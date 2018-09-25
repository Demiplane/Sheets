import * as React from 'react';
import combineClases from './combineClasses';

type InlineEditProps = {
    priorValue: string,
    onChange: (newValue: string) => void,
    validate?: (checkValue: string) => string[],
    className?: string
};

export default class InlineEdit
    extends React.Component<InlineEditProps, { focus: boolean, editValue: string }> {

    textInput: React.RefObject<HTMLInputElement>;

    constructor(props: InlineEditProps) {
        super(props);

        this.state = { focus: false, editValue: props.priorValue };

        this.textInput = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.goToEditMode = this.goToEditMode.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.commit = this.commit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.leaveEditState = this.leaveEditState.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
    }

    goToEditMode(event: React.FormEvent<HTMLSpanElement>) {
        this.setState({ focus: true, editValue: this.props.priorValue });
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ editValue: event.currentTarget.value });
    }

    commit(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.commitChanges(this.textInput.current!.value);
    }

    cancel(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.leaveEditState();
    }

    leaveEditState() {
        this.setState({ focus: false, editValue: this.props.priorValue });
    }

    onBlur(event: React.FormEvent<HTMLDivElement>) {

        var currentTarget = event.currentTarget;

        var self = this;

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

            var element = this.textInput.current;

            if (element) {
                element.focus();
            }
        }
    }

    commitChanges(newValue: string) {
        this.setState({ focus: false });
        this.props.onChange(newValue);
    }

    onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.commitChanges(event.currentTarget.value);
        }
    }

    render() {

        const inputClasses = combineClases('input-group', this.props.className);
        const spanClasses = combineClases('clickable', this.props.className);

        var dom = (
            this.state.focus ?
                (
                    <div className={inputClasses} onBlur={this.onBlur}>
                        <input
                            className="form-control"
                            ref={this.textInput}
                            value={this.state.editValue}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                            onFocus={this.handleFocus} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" onClick={this.commit} type="button">✓</button>
                            <button className="btn btn-outline-danger" onClick={this.cancel} type="button">‎X</button>
                        </div>
                    </div>) :
                (
                    <span
                        className={spanClasses}
                        onClick={this.goToEditMode}>{this.props.priorValue}</span>)
        );

        return dom;
    }
}