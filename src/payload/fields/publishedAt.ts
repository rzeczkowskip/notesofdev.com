import merge from 'lodash/merge';
import { DateField } from 'payload';
import { CustomField } from '@/payload/fields/types';

const publishedAt: CustomField<DateField> = (overrides) => {
  const fieldDefaults: Omit<DateField, 'name'> = {
    type: 'date',
    admin: {
      position: 'sidebar',
      date: {
        pickerAppearance: 'dayAndTime',
      },
    },
    hooks: {
      beforeChange: [
        ({ value }) => {
          if (!value) {
            return new Date().toISOString();
          }

          return value;
        },
      ],
    },
  };

  return merge(fieldDefaults, overrides) as DateField;
};

export default publishedAt;
