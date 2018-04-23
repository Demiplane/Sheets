import * as React from 'react';
import { Sheet, calculateValue } from './SheetModel';
import TextInput from '../controls/TextInput';
import Page from '../controls/Page';
import FluidPage from '../controls/FluidPage';
import Card from '../controls/Card';
import SheetPanel from './SheetPanel';

type SheetFormProps = {
  sheet: Sheet;
  onSave: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SheetForm: React.StatelessComponent<SheetFormProps> = (props) => {
  let sheet = props.sheet;

  return (
    <div>
      <Page>
        <form className="form-inline" >
          <TextInput
            name="sheetName"
            label="Name"
            value={sheet.name}
            error=""
            onChange={props.onSave}
            placeholder="Enter a name"
          />
        </form>
      </Page>
      <FluidPage className="">
        <div className="row">
          <div className="row col-6">

            <SheetPanel
              title="Statistics"
              fields={['Name', 'Value']}
              className="col-12">
              {sheet.statistics && sheet.statistics.map(s => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>{calculateValue(sheet, s)}</td>
                </tr>
              ))}
            </SheetPanel>

            <Card className="col-12">
              <h2>Statistics</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                {sheet.statistics && sheet.statistics.map(s => (
                  <tr>
                    <td>
                      {s.name}
                    </td>
                    <td>
                      {calculateValue(sheet, s)}
                    </td>
                  </tr>
                ))}
              </table>
            </Card>
            <Card className="col-12">
              <h2>Inventory</h2>
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                </th>
                  </tr>
                </thead>
              </table>
            </Card>
          </div>
          <div className="row col-6">
            <Card className="col-12">
              <h2>Resources</h2>
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                </th>
                  </tr>
                </thead>
              </table>
            </Card>
            <Card className="col-12">
              <h2>Abilities</h2>
              <table>
                <thead>
                  <tr>
                    <th>
                      Name
                </th>
                  </tr>
                </thead>
              </table>
            </Card>
          </div>
        </div>
      </FluidPage>
    </div>
  );
};

export default SheetForm;