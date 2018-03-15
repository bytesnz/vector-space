import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Server Options',
  type: 'object',
  properties: {
    allowUnauthenticatedCreation: {
      type: 'boolean',
      description: 'Whether or not to allow unauthenticated users to create drawings'
    },
    addClass: {
      type: 'boolean',
      description: 'Whether or not to add the `vectorSpace` class to the given element'
    },
    connectionModule: {
      type: '',
      description: 'Initialiser function for connection module to use for communicating with the server'
    },
    address: {
      type: 'string',
      description: 'address of server to connect to'
    }
  }
};
