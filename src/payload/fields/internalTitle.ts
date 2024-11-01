import merge from 'lodash/merge';
import type { TextField } from 'payload';
import { CustomField } from './types';

export const internalTitleName = 'internalTitle';

type InternalTitleConfig = {
  generateFrom?: string;
};

const internalTitle: CustomField<TextField, InternalTitleConfig> = (
  overrides,
  config,
) => {
  const beforeChange: NonNullable<TextField['hooks']>['beforeChange'] = [];

  if (config?.generateFrom) {
    beforeChange.push(({ value, data }) => {
      return value || data?.[config.generateFrom as string] || data?.id;
    });
  }

  return merge(
    {
      name: internalTitleName,
      required: false,
    },
    overrides,
    {
      type: 'text',
      unique: false,
      hooks: { beforeChange },
    },
  ) as TextField;
};

export default internalTitle;
