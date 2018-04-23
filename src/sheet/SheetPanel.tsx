import * as React from 'react';
import Card from '../controls/Card';
import combineClasses from '../controls/combineClasses';

type SheetPanelProps = {
  title: string,
  fields: string[],
  className?: string
};

const SheetPanel: React.StatelessComponent<SheetPanelProps> = (props) => {
  const classes = combineClasses(props.className, '');

  return (
    <Card className={classes}>
      <h2>{props.title}</h2>
      <table>
        <thead>
          <tr>
            {props.fields.map(f => <th key={f}>{f}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.children}
        </tbody>
      </table>
    </Card>
  );
};

export default SheetPanel;