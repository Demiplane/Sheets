import { Sheet } from '../sheet/SheetModel';
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

  updateSheet: (sheet: Sheet) => void;
  updateSheetName: (name: string) => void;

};

const SheetForm: React.StatelessComponent<SheetFormProps> = (props) => {
  const { sheet, showModal, closeModal, updateSheet, updateSheetName } = props;

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
              addStatistic={s => updateSheet(sheet.addStatistic(s))}
              updateStatistic={(i, s) => updateSheet(sheet.updateStatistic(i, s))}
              deleteStatistic={s => updateSheet(sheet.deleteStatistic(s))}

              sheet={sheet}

              showModal={showModal}
              closeModal={closeModal}
            />
            <InventoryPanel
              addItem={i => updateSheet(sheet.addItem(i))}
              deleteItem={i => updateSheet(sheet.deleteItem(i))}
              updateItem={(index, i) => updateSheet(sheet.updateItem(index, i))}

              showModal={showModal}
              closeModal={closeModal}

              sheet={sheet}

            />
          </div>

          <div className="col-6">
            <ResourcesPanel sheet={sheet} />
            <ConditionsPanel
              activateCondition={c => updateSheet(sheet.activateCondition(c))}
              inactivateCondition={c => updateSheet(sheet.inactivateCondition(c))}

              sheet={sheet}
            />
            <ActionsPanel sheet={sheet} />
            <AbilitiesPanel sheet={sheet} />
            <LogPanel
              sheet={sheet}
              addLog={l => updateSheet(sheet.addLog(l))}
              deleteLog={l => updateSheet(sheet.deleteLog(l))}
              updateLog={l => updateSheet(sheet.updateLog(l))} />
          </div>
        </div>
      </FluidPage>
    </div >
  );
};

export default SheetForm;