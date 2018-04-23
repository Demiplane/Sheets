import * as React from 'react';
import combineClasses from './combineClasses';

const Card: React.StatelessComponent<{ className?: string }> = (props) => {
  let classes = combineClasses(
    props.className,
    'card sheet-card pb-2 pt-2 pl-2 pr-2 mb-2 mt-2 ml-2 mr-2');

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
};

export default Card;