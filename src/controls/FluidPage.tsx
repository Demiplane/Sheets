import * as React from 'react';
import combineClasses from './combineClasses';

const FluidPage: React.StatelessComponent<{ className?: string }> = (props) => {
  let classes = combineClasses(
    props.className,
    'container-fluid sheet-page pb-4 pt-4 pl-4 pr-4');

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

export default FluidPage;