import * as React from 'react';
import combineClasses from './combineClasses';

const DeleteButton: React.StatelessComponent<{
    className?: string,
    onDelete: () => void
}> = ({ className, onDelete }) => {
    const classes = combineClasses('btn btn-outline-danger', className);

    return (
        <button
            className={classes}
            onClick={evt => { evt.preventDefault(); onDelete(); }}
            type="button">X</button>
    );
};

export default DeleteButton;
