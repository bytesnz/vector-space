import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space Screen Sync messages',
  description: 'Message that can be (sent or?) received for screen syncing',
  definitions: {
    Sync: {
      type: 'object',
      extends: { $ref: 'message' },
      properties: {
        type: {
          type: 'string',
          enum: [ 'sync' ]
        }
      }
    },
    Focus: {
      type: 'object',
      extends: { $ref: 'message' },
      properties: {
        type: {
          type: 'string',
          enum: [ 'focus' ]
        },
        center: {
          $ref: '../objects#/definitions/Coordinate'
        },
        dimensions: {
          $ref: '../objects#/definitions/Coordinate'
        },
        zoom: {
          $ref: '../objects#/definitions/Zoom'
        }
      },
      required: [ 'center', 'dimensions', 'zoom' ]
    }
  }
};
