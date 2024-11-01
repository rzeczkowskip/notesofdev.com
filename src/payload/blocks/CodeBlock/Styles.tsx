import type { ClientField } from 'payload';

const Styles = ({ clientField }: { clientField: ClientField }) => {
  if (!clientField?.admin?.className) {
    return null;
  }

  return (
    <style>
      {`.${clientField.admin.className} textarea { 
        font-family: monospace;
        line-height: 1.5;
      }`}
    </style>
  );
};

export default Styles;
