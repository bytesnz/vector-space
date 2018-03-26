import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Revision',
  type: 'object',
  description: `Vector Space Drawing Revision`,
  properties: {
    id: {
      type: 'string',
      description: `
        Identifier for the Vector Space drawing. This is used to access the
       `
    },
    revision: {
      type: 'string',
      description: `
        Identifier for the Vector Space revision. This can be used with the
        id to access a specific revision of the drawing
      `
    },
    created: {
      type: 'number',
      description: `
        Javascript UTC timestamp (in milliseconds since epoch) of when the
        revision was created
      `
    },
    updated: {
      type: 'number',
      description: `
        Javascript UTC timestamp (in milliseconds since epoch) of when the
        revision was last updated
      `
    },
    createdBy: {
      $ref: 'user#/definitions/User/properties/id'
    },
    updatedBy: {
      $ref: 'user#/definitions/User/properties/id'
    },
    spaces: {
      type: 'array',
      description: 'Spaces of this revision',
      items: {
        type: 'object',
        properties: {
          space: {
            $ref: 'objects#/definitions/VectorSpace'
          }
        },
        additionalProperties: true
      }
    },
    permissions: {
      type: 'object',
      description: 'The permissions for this revision',
      properties: {
        read: {
          $ref: 'user#/definitions/Permission'
        },
        write: {
          $ref: 'user#/definitions/Permission'
        }
      },
      additionalProperties: {
        $ref: 'user#/definitions/Permission'
      }
    },
    history: {
      $ref: 'history#/definitions/History'
    }
  },
  required: ['id', 'created', 'space', 'history']
};
