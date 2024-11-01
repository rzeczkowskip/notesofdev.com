import type { Block, OptionObject } from 'payload';

const languages: OptionObject[] = [
  {
    label: 'Typescript',
    value: 'typescript',
  },
  {
    label: 'Javascript',
    value: 'javascript',
  },
  {
    label: 'CSS',
    value: 'css',
  },
  {
    label: 'PHP',
    value: 'php',
  },
  {
    label: 'Shell',
    value: 'shell',
  },
  {
    label: 'Plain text',
    value: 'plaintext',
  },
  {
    label: 'YAML',
    value: 'yaml',
  },
];

const Index: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: languages[0].value,
      options: languages,
    },
    {
      name: 'code',
      type: 'textarea',
      label: false,
      required: false,
      admin: {
        className: 'code-block-font',
        components: {
          beforeInput: [
            {
              path: '@/payload/blocks/CodeBlock/Styles',
            },
          ],
        },
      },
    },
  ],
};

export default Index;
