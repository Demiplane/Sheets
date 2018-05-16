import * as React from 'react';
import Sheet, { getConditions, conditionIsActive } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import { connect } from 'react-redux';
import { ConnectedSheetProps, mapSheetActions } from '../sheet/sheetActions';
import { distinct } from '../core/distinct';
import RootState from '../core/RootState';

type ConditionsPanelProps = ConnectedSheetProps & {
  className?: string,
  sheet: Sheet
};

class ConditionsPanel extends React.Component<ConditionsPanelProps, { expanded: string[] }> {
  constructor(props: ConditionsPanelProps) {
    super(props);
  }

  activateCondition(condition: string) {
    const sheet = Object.assign({}, this.props.sheet);

    sheet.conditions = distinct(sheet.conditions.concat(condition));

    this.props.updateSheet!(sheet);
  }

  inactivateCondition(condition: string) {
    const sheet = Object.assign({}, this.props.sheet);

    sheet.conditions = sheet.conditions.filter(c => c !== condition);

    this.props.updateSheet!(sheet);
  }

  toRowPair = (sheet: Sheet, condition: string) => {
    const isActive = conditionIsActive(sheet, condition);

    return (
      <tr>
        <td>{condition}</td>
        <td className="text-center">
          <button
            className={'btn btn-small ' + (isActive ? 'btn-primary' : '')}
            onClick={event => {
              event.preventDefault();
              isActive ? this.inactivateCondition(condition) : this.activateCondition(condition);
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

function mapStateToProps(state: RootState, ownProps: ConditionsPanelProps): ConditionsPanelProps {
  return ownProps;
}

export default connect(mapStateToProps, mapSheetActions)(ConditionsPanel);