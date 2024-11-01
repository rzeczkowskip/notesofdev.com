import { Renderer } from '../types';

const LineBreak: Renderer<{ tag?: keyof React.JSX.IntrinsicElements }> = () => {
  return <br />;
};

export default LineBreak;
