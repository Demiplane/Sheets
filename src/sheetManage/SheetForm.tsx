import { Sheet, Statistic } from '../sheet/SheetModel';
import * as React from 'react';
import AbilitiesPanel from './AbilitiesPanel';
import FluidPage from '../controls/FluidPage';
import InventoryPanel from './InventoryPanel';
import ResourcesPanel from './ResourcesPanel';
import StatisticsPanel from './StatisticsPanel';
import ActionsPanel from './ActionsPanel';
import ConditionsPanel from './ConditionsPanel';

type SheetFormProps = {
  sheet: Sheet;
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;

  activateCondition: (condition: string) => void;
  inactivateCondition: (condition: string) => void;

  updateStatistic: (statistic: Statistic) => void;
  addStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;
};

const SheetForm: React.StatelessComponent<SheetFormProps> = (props) => {
  const { sheet, showModal, closeModal,
    addStatistic, updateStatistic, deleteStatistic,
    activateCondition, inactivateCondition } = props;

  return sheet ?
    (
      <div>
        <FluidPage>
          <div className="pl-2 pr-2 d-flex align-items-center">
            <h1>{sheet.name}</h1>
            <button className="btn btn-link btn-small text-muted mr-auto"
            >(rename)</button>
            <div className="align-middle">
              <button className="btn btn-small btn-primary"
              >Save and Close</button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-6">
              <StatisticsPanel
                addStatistic={addStatistic}
                updateStatistic={updateStatistic}
                deleteStatistic={deleteStatistic}
                sheet={sheet}
                showModal={showModal}
                closeModal={closeModal}
              />
              <InventoryPanel sheet={sheet} />
            </div>

            <div className="col-6">
              <ResourcesPanel sheet={sheet} />
              <ConditionsPanel
                activateCondition={activateCondition}
                inactivateCondition={inactivateCondition}
                sheet={sheet} />
              <ActionsPanel sheet={sheet} />
              <AbilitiesPanel sheet={sheet} />
            </div>
          </div>
        </FluidPage>
      </div >
    )
    : <FluidPage><p className="text-center">Loading...</p></FluidPage>;
};

export default SheetForm;