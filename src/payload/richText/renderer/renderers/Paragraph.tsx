import { Renderer } from '../types';

const Paragraph: Renderer<{ tag?: keyof React.JSX.IntrinsicElements }> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data,
  ...props
}) => {
  return <p {...props} />;
};

export default Paragraph;
