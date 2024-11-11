import type { CollectionConfig } from 'payload';

const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 3600 * 24 * 7,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Admins;
