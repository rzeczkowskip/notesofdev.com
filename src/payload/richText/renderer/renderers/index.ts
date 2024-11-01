import type { Renderer } from '../types';
import Heading from './Heading';
import HorizontalRule from './HorizontalRule';
import LineBreak from './LineBreak';
import List from './List';
import ListItem from './ListItem';
import Paragraph from './Paragraph';
import Quote from './Quote';
import Text from './Text';

const renderers: Record<string, Renderer> = {
  text: Text,
  heading: Heading,
  list: List,
  listitem: ListItem,
  paragraph: Paragraph,
  horizontalrule: HorizontalRule,
  linebreak: LineBreak,
  quote: Quote,
};

export default renderers;
