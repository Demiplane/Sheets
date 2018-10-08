import * as React from 'react';
import Sheet from '../sheet/SheetModel';
import InlineEdit from './InlineEdit';

type FormulaInlineEditProps = {
    priorFormula: string,
    sheet: Sheet,
    onChange: (newFormula: string) => void,
    validate?: (checkFormula: string) => string[],
    className?: string
};

export default class FormulaInlineEdit
    extends React.Component<FormulaInlineEditProps> {

    textInput: React.RefObject<HTMLInputElement>;

    constructor(props: FormulaInlineEditProps) {
        super(props);
    }

    render() {

        var dom = (
            <InlineEdit
                priorValue={this.props.priorFormula}
                onChange={this.props.onChange}
                className={this.props.className}
                validate={this.props.validate} />

        );

        return dom;
    }
}