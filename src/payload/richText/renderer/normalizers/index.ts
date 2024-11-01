import { LexicalNodeNormalizer } from '../types';
import { normalizeNestedLists } from './list';

const normalizers: LexicalNodeNormalizer[] = [normalizeNestedLists];

export default normalizers;
