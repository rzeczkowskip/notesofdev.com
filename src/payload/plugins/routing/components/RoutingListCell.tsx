'use client';

// @ts-expect-error FML, no idea about the type for now
const RoutingListCell = (props) => {
  const { cellData } = props;
  return cellData.path;
};

export default RoutingListCell;
