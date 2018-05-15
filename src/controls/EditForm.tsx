import * as React from 'react';

const EditForm: React.StatelessComponent<{
  header: string,
  onSave?: () => void,
  onCancel?: () => void
}> = ({ header, children, onSave, onCancel }) => {

  return (
    <div className="sheet-panel card p-4">
      <h1>{header}</h1>
      <form className="form-inline">
        {children}
      </form>
      <div>
        {onSave ? (
          <button
            onClick={event => { event.preventDefault(); onSave(); }}
            className="btn btn-small btn-secondary d-inline float-right"
          >Cancel</button>
        ) : null}
        {onCancel ? (
          <button
          onClick={event => { event.preventDefault(); onCancel(); }}
            className="btn btn-small btn-primary d-inline float-right"
          >Save</button>
        ) : null}
      </div>
    </div>
  );

};

export default EditForm;