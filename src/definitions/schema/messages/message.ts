import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Message',
  description: 'Base message object for Vector Space messages',
  type: 'object',
  properties: {
    type: {
      type: 'string'
    }
  },
  required: [ 'type' ]
};
