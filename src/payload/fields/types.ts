import type { Field } from 'payload';

export type CustomField<
  FieldType extends Field,
  FieldOptions extends Record<string, unknown> | void = void,
  ReturnType = FieldType,
> = (
  overrides?: Partial<FieldType>,
  options?: Partial<FieldOptions>,
) => ReturnType;
