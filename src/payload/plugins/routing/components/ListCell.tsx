'use client';
import { useTableCell } from '@payloadcms/ui';

const ListCell = () => {
  const { cellData } = useTableCell();
  return cellData?.slug?.value;
};

export default ListCell;
