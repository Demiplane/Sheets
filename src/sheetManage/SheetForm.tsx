import { Sheet, Statistic, Item, Log, Condition } from '../sheet/SheetModel';
import * as React from 'react';
import AbilitiesPanel from './AbilitiesPanel';
import FluidPage from '../controls/FluidPage';
import InventoryPanel from './InventoryPanel';
import ResourcesPanel from './ResourcesPanel';
import StatisticsPanel from './StatisticsPanel';
import ActionsPanel from './ActionsPanel';
import ConditionsPanel from './ConditionsPanel';
import LogPanel from './LogPanel';
import { RenameForm } from './RenameForm';

type SheetFormProps = {
  sheet: Sheet;
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;

  activateCondition: (condition: Condition) => void;
  inactivateCondition: (condition: Condition) => void;

  updateSheetName: (name: string) => void;

  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  deleteItem: (item: Item) => void;

  updateStatistic: (statistic: Statistic) => void;
  addStatistic: (statistic: Statistic) => void;
  deleteStatistic: (statistic: Statistic) => void;

  addLog: (log: Log) => void;
  deleteLog: (log: Log) => void;
  updateLog: (log: Log) => void;
};

const SheetForm: React.StatelessComponent<SheetFormProps> = (props) => {
  const { sheet, showModal, closeModal,
    addStatistic, updateStatistic, deleteStatistic,
    updateSheetName,
    updateItem, addItem, deleteItem,
    addLog, deleteLog, updateLog,
    activateCondition, inactivateCondition } = props;

  return (
    <div>
      <FluidPage>
        <div className="pl-2 pr-2 d-flex align-items-center">
          <h1>{sheet.name}</h1>
          <button
            className="btn btn-link btn-small text-muted mr-auto"
            onClick={event => {
              event.preventDefault();
              showModal((
                <RenameForm
                  name={sheet.name}
                  header="Rename Sheet"
                  save={s => { updateSheetName(s); closeModal(); }}
                  cancel={closeModal}
                />
              ));
            }}
          >(rename)</button>
          <div
            className="align-middle">
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
            <InventoryPanel
              addItem={addItem}
              deleteItem={deleteItem}
              updateItem={updateItem}

              showModal={showModal}
              closeModal={closeModal}

              sheet={sheet}

            />
          </div>

          <div className="col-6">
            <ResourcesPanel sheet={sheet} />
            <ConditionsPanel
              activateCondition={activateCondition}
              inactivateCondition={inactivateCondition}

              sheet={sheet}
            />
            <ActionsPanel sheet={sheet} />
            <AbilitiesPanel sheet={sheet} />
            <LogPanel
              sheet={sheet}
              addLog={addLog}
              deleteLog={deleteLog}
              updateLog={updateLog} />
          </div>
        </div>
      </FluidPage>
    </div >
  );
};

export default SheetForm;