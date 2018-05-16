import { Sheet } from '../sheet/SheetModel';
import * as React from 'react';
import AbilitiesPanel from './AbilitiesPanel';
import FluidPage from '../controls/FluidPage';
import InventoryPanel from './InventoryPanel';
import ResourcesPanel from './ResourcesPanel';
import StatisticsPanel from './StatisticsPanel';
import ActionsPanel from './ActionsPanel';
import TextInput from '../controls/TextInput';
import ConditionsPanel from './ConditionsPanel';

type SheetFormProps = {
  sheet: Sheet;
  showModal: (modalElement: JSX.Element) => void;
  closeModal: () => void;
  onSave: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SheetForm: React.StatelessComponent<SheetFormProps> = (props) => {
  const { sheet, showModal, closeModal } = props;

  return sheet ?
    (
      <div>
        <form className="form-inline" >
          <FluidPage>
            <div className="row justify-content-between pl-4 pr-4 pb-2">
              <TextInput
                name="sheetName"
                label="Name"
                value={sheet.name}
                error=""
                onChange={props.onSave}
                placeholder="Enter a name"
              />
              <button className="btn btn-primary">Save and Close</button>
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <StatisticsPanel
                  sheet={sheet}
                  showModal={showModal}
                  closeModal={closeModal}
                />
                <InventoryPanel sheet={sheet} />
              </div>

              <div className="col-6">
                <ResourcesPanel sheet={sheet} />
                <ConditionsPanel
                  sheet={sheet} />
                <ActionsPanel sheet={sheet} />
                <AbilitiesPanel sheet={sheet} />
              </div>
            </div>
          </FluidPage>
        </form>
      </div >
    )
    : <FluidPage><p className="text-center">Loading...</p></FluidPage>;
};

export default SheetForm;