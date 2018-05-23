import * as React from 'react';
import Sheet, { getConditions, conditionIsActive } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

type ConditionsPanelProps = {
  className?: string,
  sheet: Sheet,
  activateCondition: (condition: string) => void;
  inactivateCondition: (condition: string) => void;
};

class ConditionsPanel extends React.Component<ConditionsPanelProps, { expanded: string[] }> {
  constructor(props: ConditionsPanelProps) {
    super(props);
  }

  toRowPair = (sheet: Sheet, condition: string) => {
    const isActive = conditionIsActive(sheet, condition);

    return (
      <tr key={condition}>
        <td>{condition}</td>
        <td className="text-center">
          <button
            className={'btn btn-small ' + (isActive ? 'btn-primary' : '')}
            onClick={event => {
              event.preventDefault();
              isActive ? this.props.inactivateCondition(condition) : this.props.activateCondition(condition);
            }}>
            {isActive ? 'ACTIVE' : 'INACTIVE'}
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { sheet, className } = this.props;
    const conditions = getConditions(sheet);

    return (
      <SheetPanel
        title="Conditions"
        className={className}>

        <table className="table table-bordered table-hover">

          <tbody>
            {conditions.map(condition => this.toRowPair(sheet, condition))}
          </tbody>

        </table>
      </SheetPanel>
    );
  }
}

export default ConditionsPanel;