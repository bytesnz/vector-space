import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Revision messages',
  description: `
    Messages that can be received (or sent?) for receiving revisions or updates
    to revisions
  `,
  definitions: {
    Revision: {
      type: 'object',
      extends: { $ref: 'message' },
      properties: {
        data: {
          $ref: '../revision'
        }
      },
      required: [ 'data' ]
    },
    Updates: {
      type: 'object',
      extends: { $ref: 'message' },
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '../interaction'
          }
        }
      },
      required: [ 'data' ]
    },
    Publish: {
      type: 'object',
      extends: { $ref: 'message' },
      properties: {
        newRevision: {
          $ref: '../objects#/definitions/ID'
        }
      }
    }
  }
};

