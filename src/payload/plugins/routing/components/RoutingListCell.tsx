'use client';
import { useTableCell } from '@payloadcms/ui';

const RoutingListCell = () => {
  const { cellData } = useTableCell();
  return cellData.path;
};

export default RoutingListCell;
