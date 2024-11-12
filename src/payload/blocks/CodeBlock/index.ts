import type { Block } from 'payload';
import { hljs, promotedLanguages } from '@/lib/hljs';

const languages: string[] = [
  ...new Set([...promotedLanguages, ...hljs.listLanguages()]),
];

const Index: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: languages[0],
      options: languages,
      required: true,
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
