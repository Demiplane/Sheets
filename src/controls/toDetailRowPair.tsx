import * as React from 'react';
import { ReactNode } from 'react';

export type DetailRowPairProps = {
  expand: () => void;
  itemKey: string;
  className?: string,
  expanded: boolean
};

export default function toDetailRowPair<TProps extends DetailRowPairProps>(
  props: TProps,
  row: (props: TProps) => ReactNode,
  detail: (props: TProps) => ReactNode
) {
  const { itemKey, expanded, expand } = props;

  return [(
    <tr
      className={'clickable' + (expanded ? ' selected' : '')}
      onClick={event => { event.preventDefault(); expand(); }}
      key={itemKey}
    >
      {row(props)}
    </tr>
  ),
  expanded && (
    <tr key={itemKey + '-detail'} className="sheet-detail-row">
      {detail(props)}
    </tr>
  )];
}