import type { Field, GroupField } from 'payload';
import beforeValidate from './beforeValidate';

type Options = {
  useFields: string[];
  allowEdit: boolean;
};

const slug = (options: Partial<Options> = {}): GroupField => {
  const config: Options = {
    useFields: [],
    allowEdit: true,
    ...options,
  };

  const fields: Field[] = [
    {
      type: 'text',
      name: 'value',
      label: 'Slug',
      required: config.useFields.length === 0,
      admin: {
        readOnly: !config.allowEdit && config.useFields.length !== 0,
        description:
          config.useFields.length !== 0
            ? 'Leave empty to regenerate'
            : undefined,
      },
      hooks: {
        beforeValidate: [beforeValidate(config.useFields)],
      },
    },
  ];

  if (config.allowEdit || config.useFields.length === 0) {
    fields.push({
      type: 'checkbox',
      required: false,
      name: 'auto',
      label: 'Auto generate',
      defaultValue: true,
    });
  }

  return {
    name: 'slug',
    type: 'group',
    label: false,
    admin: {
      hideGutter: true,
    },
    localized: true,
    fields,
  };
};

export default slug;
