import { Renderer } from '../types';

const Quote: Renderer<{ tag?: keyof React.JSX.IntrinsicElements }> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data,
  ...props
}) => {
  return <blockquote {...props} />;
};

export default Quote;
