import * as React from 'react';
import Sheet, { Log } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';
import InlineEdit from '../controls/InlineEdit';
import AddBox from '../controls/AddBox';
import DeleteButton from '../controls/DeleteButton';

type LogPanelProps = {
  className?: string,
  sheet: Sheet,
  addLog: (log: Log) => void,
  updateLog: (log: Log) => void,
  deleteLog: (log: Log) => void
};

export default class LogPanel extends React.Component<LogPanelProps, { editValue: string }> {
  constructor(props: LogPanelProps) {
    super(props);
    this.state = { editValue: '' };

    this.onDeleteLog = this.onDeleteLog.bind(this);
    this.addLog = this.addLog.bind(this);
  }

  onDeleteLog(event: React.FormEvent<HTMLButtonElement>, log: Log) {
    event.preventDefault();
    this.props.deleteLog(log);
  }

  addLog(text: string) {
    this.props.addLog(new Log({ text }));
    this.setState({ editValue: '' });
  }

  updateLogText(log: Log, text: string) {
    this.props.updateLog(log.updateText(text));
  }

  render() {
    const { className, sheet } = this.props;

    return (
      <SheetPanel
        title="Log"
        className={className}>

        <div className="list-group">
          {sheet.logs && sheet.logs.map(l =>
            (
              <div key={l.timestamp}
                className="list-group-item d-flex align-items-center">
                <div style={{ width: '100%' }}>
                  <div className="text-muted small">{l.timestamp}</div>
                  <InlineEdit priorValue={l.text} onChange={text => this.updateLogText(l, text)} />
                </div>
                <div className="pl-2 hide-unless-hover">
                  <DeleteButton className="float-right" onDelete={() => this.props.deleteLog(l)} />
                </div>
              </div>
            ))}
        </div>

        <AddBox placeholder="add log" onAdd={this.addLog} />

      </SheetPanel>
    );
  }
}