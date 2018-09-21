import * as React from 'react';
import combineClasses from './combineClasses';
import Sheet from '../sheet/SheetModel';
import TextInput from './TextInput';

type FormulaManageBoxProps = {
    priorFormula: string,
    sheet: Sheet,
    onChange: (newFormula: string) => void,
    className?: string
};

export class FormulaManageBox extends React.Component<FormulaManageBoxProps, { editingFormula: string }> {

    constructor(props: FormulaManageBoxProps) {
        super(props);

        this.setState({ editingFormula: props.priorFormula });
    }

    onFocus() {

    }

    updateFormula() {

    }

    render() {

        const { priorFormula, className } = this.props;

        return (
            focus ?
                <p className={className} onFocus={evt => { evt.preventDefault(); this.onFocus(); }}>priorFormula</p> :
                <div className={className}>
                    <TextInput
                        value={priorFormula}
                        onChange={this.updateFormula} />
                </div >
        );
    }
}

export default FormulaManageBox;