import { Sheet } from '../sheet/SheetModel';
import * as React from 'react';
import AbilitiesPanel from './AbilitiesPanel';
import FluidPage from '../controls/FluidPage';
import InventoryPanel from './InventoryPanel';
import ResourcesPanel from './ResourcesPanel';
import StatisticsPanel from './StatisticsPanel';
import ActionsPanel from './ActionsPanel';
import TextInput from '../controls/TextInput';

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
            <div className="row justify-content-between pl-4 pr-4">
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

            <div className="row">
              <StatisticsPanel
                className="col-4"
                sheet={sheet}
                showModal={showModal}
                closeModal={closeModal}
              />
              <ResourcesPanel className="col-4" sheet={sheet} />
              <ActionsPanel className="col-4" sheet={sheet} />
            </div>
            <div className="row">
              <InventoryPanel className="col-6" sheet={sheet} />
              <AbilitiesPanel className="col-6" sheet={sheet} />
            </div>
          </FluidPage>
        </form>
      </div >
    )
    : <FluidPage><p className="text-center">Loading...</p></FluidPage>;
};

export default SheetForm;