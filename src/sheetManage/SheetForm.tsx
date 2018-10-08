import { Sheet } from '../sheet/SheetModel';
import * as React from 'react';
import AbilitiesPanel from './AbilitiesPanel';
import FluidPage from '../controls/FluidPage';
import InventoryPanel from './InventoryPanel';
import ResourcesPanel from './ResourcesPanel';
import StatisticsPanel from './StatisticsPanel';
import ActionsPanel from './ActionsPanel';
import EffectsPanel from './EffectsPanel';
import LogPanel from './LogPanel';
import InlineEdit from '../controls/InlineEdit';

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
          <h1 className="flex-grow-1"><InlineEdit priorValue={sheet.name} onChange={v => updateSheetName(v)} /></h1>
          <div className="align-middle">
            <button className="btn btn-primary" onClick={evt => {
              evt.preventDefault();

              const content = JSON.stringify(sheet);

              var a = document.createElement('a');
              var file = new Blob([content], { type: 'application/json' });
              a.href = URL.createObjectURL(file);
              a.download = sheet.name + '.json';
              a.click();

            }}>Save to File</button>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-6">
            <StatisticsPanel
              addStatistic={s => updateSheet(sheet.addStatistic(s))}
              updateStatistic={(i, s) => updateSheet(sheet.updateStatistic(i, s))}
              deleteStatistic={s => updateSheet(sheet.deleteStatistic(s))}

              reorder={(i, ii) => updateSheet(sheet.moveStatistic(i, ii))}

              sheet={sheet}

              showModal={showModal}
              closeModal={closeModal}
            />
            <InventoryPanel
              addItem={i => updateSheet(sheet.addItem(i))}
              deleteItem={i => updateSheet(sheet.deleteItem(i))}
              updateItem={(index, i) => updateSheet(sheet.updateItem(index, i))}
              reorder={(i, ii) => updateSheet(sheet.moveItem(i, ii))}

              showModal={showModal}
              closeModal={closeModal}

              sheet={sheet}

            />
          </div>

          <div className="col-6">
            <ResourcesPanel
              sheet={sheet}
              updateResource={(i, r) => updateSheet(sheet.updateResource(i, r))}
              addResource={r => updateSheet(sheet.addResource(r))}
              deleteResource={r => updateSheet(sheet.deleteResource(r))}
            />
            <EffectsPanel
              activateEffect={c => updateSheet(sheet.activateEffect(c))}
              inactivateEffect={c => updateSheet(sheet.inactivateEffect(c))}

              updateEffect={(i, c) => updateSheet(sheet.updateEffect(i, c))}
              addEffect={c => updateSheet(sheet.addEffect(c))}
              deleteEffect={c => updateSheet(sheet.deleteEffect(c))}
              reorder={(i, ii) => updateSheet(sheet.moveEffect(i, ii))}

              sheet={sheet}
            />
            <ActionsPanel
              sheet={sheet} />
            <AbilitiesPanel
              updateAbility={(i, a) => updateSheet(sheet.updateAbility(i, a))}
              addAbility={a => updateSheet(sheet.addAbility(a))}
              deleteAbility={a => updateSheet(sheet.deleteAbility(a))}
              sheet={sheet} />
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