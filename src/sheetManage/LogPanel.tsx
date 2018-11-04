import * as React from 'react';
import Sheet, { Log } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import MegaTable from '../controls/MegaTable';

type LogPanelProps = {
  className?: string,
  sheet: Sheet,
  addLog: (log: Log) => void,
  updateLog: (log: Log) => void,
  deleteLog: (log: Log) => void
};

class Table extends MegaTable<Log> { }

export default class LogPanel extends React.Component<LogPanelProps> {
  constructor(props: LogPanelProps) {
    super(props);
  }

  render() {
    const { className, sheet, updateLog, addLog } = this.props;

    return (
      <SheetPanel
        title="Log"
        className={className}>

        <Table
          items={sheet.logs}
          addPlaceholder="add log"
          add={text => addLog(new Log({ text }))}
          remove={log => this.props.deleteLog(log)}

          render={(index, l) => [
            (
              <div key={index.toString()} style={{ width: '100%' }}>
                <div className="text-muted small">{l.timestamp}</div>
                <InlineEdit priorValue={l.text} onChange={text => updateLog(l.updateText(text))} />
              </div>
            )
          ]}
        />

      </SheetPanel>
    );
  }
}