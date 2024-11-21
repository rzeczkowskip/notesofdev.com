import type { Block } from 'payload';

const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  fields: [
    {
      type: 'select',
      name: 'type',
      defaultValue: 'neutral',
      options: ['neutral', 'info'],
    },
    { type: 'richText', name: 'content' },
  ],
};

export default CalloutBlock;
