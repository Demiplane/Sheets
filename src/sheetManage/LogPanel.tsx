import * as React from 'react';
import Sheet, { Log } from '../sheet/SheetModel';
import SheetPanel from './SheetPanel';

type LogPanelProps = {
  className?: string,
  sheet: Sheet,
  addLog: (log: Log) => void,
  updateLog: (log: Log) => void,
  deleteLog: (timestamp: string) => void
};

export default class LogPanel extends React.Component<LogPanelProps, { editValue: string }> {
  constructor(props: LogPanelProps) {
    super(props);
    this.state = { editValue: '' };

    this.onDeleteLog = this.onDeleteLog.bind(this);
    this.onInputKeyUp = this.onInputKeyUp.bind(this);
    this.onAddLog = this.onAddLog.bind(this);
    this.addLog = this.addLog.bind(this);
    this.onChangeNewLogText = this.onChangeNewLogText.bind(this);
  }

  onDeleteLog(event: React.FormEvent<HTMLButtonElement>, log: Log) {
    event.preventDefault();
    this.props.deleteLog(log.timestamp);
  }

  onInputKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.key === 'Enter') {
      this.addLog(this.state.editValue);
    }
  }

  addLog(text: string) {
    this.props.addLog(new Log({ text }));
    this.setState({ editValue: '' });
  }

  onAddLog(event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.addLog(this.state.editValue);
  }

  onChangeNewLogText(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ editValue: event.currentTarget.value });
    event.stopPropagation();
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
                  <span>{l.text}</span>
                </div>
                <button
                  className="btn btn-outline-danger float-right align-middle"
                  onClick={evt => this.onDeleteLog(evt, l)}
                  type="button">X</button>
              </li>
            ))}
        </ul>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={this.state.editValue}
            onChange={this.onChangeNewLogText}
            onKeyUp={this.onInputKeyUp} />
          <div className="input-group-append">
            <button className="btn btn-secondary" onClick={this.onAddLog} type="button">Add</button>
          </div>
        </div>
      </SheetPanel>
    );
  }
}