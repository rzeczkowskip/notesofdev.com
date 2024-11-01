import { HTMLAttributes } from 'react';
import type { LexicalNode, Renderer } from '../types';

const isInCheckboxList = (ancestors: LexicalNode[]) => {
  const parentListItem = ancestors.find((ancestor) => ancestor.type === 'list');

  return (
    parentListItem &&
    'listType' in parentListItem &&
    parentListItem.listType === 'check'
  );
};

type ListItemCheckboxProps = {
  isChecked?: boolean;
  checkedComponent?: React.ReactNode;
  uncheckedComponent?: React.ReactNode;
};

const ListItemCheckbox = ({
  isChecked,
  checkedComponent,
  uncheckedComponent,
}: ListItemCheckboxProps) => {
  return isChecked
    ? checkedComponent || <>✓&nbsp;</>
    : uncheckedComponent || <>▢&nbsp;</>;
};

const ListItem: Renderer<{ checked?: boolean; value?: string | number }> = ({
  data,
  children,
  ...props
}) => {
  const isCheckbox = isInCheckboxList(data.ancestors || []);
  const checkboxProps: HTMLAttributes<HTMLLIElement> = isCheckbox
    ? {
        'aria-checked': data.node?.checked ? 'true' : 'false',
        role: 'checkbox',
        tabIndex: -1,
      }
    : {};

  return (
    <li {...props} {...checkboxProps}>
      {isCheckbox && (
        <span style={{ userSelect: 'none' }}>
          <ListItemCheckbox
            isChecked={data.node?.checked}
            checkedComponent={data.options?.checkboxList?.checkedComponent}
            uncheckedComponent={data.options?.checkboxList?.uncheckedComponent}
          />
        </span>
      )}
      {children}
    </li>
  );
};

export default ListItem;
