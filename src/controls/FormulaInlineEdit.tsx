import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import combineClases from './combineClasses';

type FormulaInlineEditProps = {
    priorFormula: string,
    sheet: Sheet,
    onChange: (newFormula: string) => void,
    validate?: (checkFormula: string) => string[],
    className?: string
};

export default class FormulaInlineEdit
    extends React.Component<FormulaInlineEditProps, { focus: boolean, editValue: string }> {

    textInput: React.RefObject<HTMLInputElement>;

    constructor(props: FormulaInlineEditProps) {
        super(props);

        this.state = { focus: false, editValue: props.priorFormula };

        this.textInput = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.goToEditMode = this.goToEditMode.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    goToEditMode(event: React.FormEvent<HTMLParagraphElement>) {
        console.log('focus');
        this.setState({ focus: true, editValue: this.props.priorFormula });
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ editValue: event.currentTarget.value });
    }

    onBlur(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ focus: false });
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

    onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.setState({ focus: false });
            this.props.onChange(event.currentTarget.value);
        }
    }

    render() {

        const classes = combineClases(this.props.className);

        var dom = (
            this.state.focus ?
                (
                    <input
                        className={classes}
                        ref={this.textInput}
                        onBlur={this.onBlur}
                        value={this.state.editValue}
                        onChange={this.onChange}
                        onKeyUp={this.onKeyUp}
                        onFocus={this.handleFocus} />) :
                (
                    <p
                        className={classes}
                        onClick={this.goToEditMode}>{this.state.editValue}</p>)
        );

        return dom;
    }
}