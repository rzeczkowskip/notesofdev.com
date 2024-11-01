import { Renderer } from '../types';

const HorizontalRule: Renderer<{
  tag?: keyof React.JSX.IntrinsicElements;
}> = () => {
  return <hr />;
};

export default HorizontalRule;
