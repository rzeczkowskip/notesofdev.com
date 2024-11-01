import { Renderer } from '../types';

const Heading: Renderer<{ tag?: keyof React.JSX.IntrinsicElements }> = ({
  data,
  ...props
}) => {
  const HeadingTag = data.node.tag || 'p';

  return <HeadingTag {...props} />;
};

export default Heading;
