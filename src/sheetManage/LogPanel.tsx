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

        <ul className="list-group">
          {sheet.logs && sheet.logs.map(l =>
            (
              <li key={l.timestamp} className="list-group-item">
                <div className="float-left">
                  <span className="text-muted">{l.timestamp}</span>
                  <br />
                  <InlineEdit priorValue={l.text} onChange={text => this.updateLogText(l, text)} />
                </div>
                <DeleteButton className="float-right" onDelete={() => this.props.deleteLog(l)} />
              </li>
            ))}
        </ul>

        <AddBox placeholder="add log" onAdd={this.addLog} />

      </SheetPanel>
    );
  }
}