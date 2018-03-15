import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Instance Options',
  type: 'object',
  properties: {
    hightlight: {
      type: 'array',
      description: 'Array of ids of objects to highlight on the load of the the space',
      items: {
        $ref: 'objects#/definitions/ID'
      }
    }
  }
};
