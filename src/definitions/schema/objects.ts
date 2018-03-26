import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space object definitions',
  definitions: {
    ID: {
      id: 'ID',
      description: 'Vector Space-wide unique identifier for item',
      oneOf: [
        {
          type: 'string'
        },
        {
          type: 'number'
        }
      ]
    },
    Zoom: {
      id: 'Zoom',
      type: 'number',
      description: 'Zoom level',
      min: 0
    },
    VectorSpace: {
      id: 'VectorSpace',
      type: 'array',
      description: `
        A Vector Space containing layers and objects
      `,
      items: {
        oneOf: [
          { $ref: '#/definitions/Point' },
          { $ref: '#/definitions/Line' },
          { $ref: '#/definitions/Layer' }
        ]
      }
    },
    Object: {
      id: 'Object',
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Vector Space-wide unique identifier of the object'
        }
      }
    },
    Coordinate: {
      id: 'Coordinate',
      type: 'array',
      items: [
        {
          type: 'number',
          description: 'x coordinate'
        },
        {
          type: 'number',
          description: 'y coordinate'
        }
      ],
      minItems: 2,
      maxItems: 2
    },

    Point: {
      id: 'Point',
      type: 'object',
      description: 'Point on the Vector Space',
      extends: { $ref: '#/definitions/Object' },
      properties: {
        point: {
          type: 'array',
          description: 'Coordinates of the point on the Vector Space'
        }
      },
      required: [ 'id', 'point' ]
    },

    Line: {
      id: 'Line',
      type: 'object',
      description: 'Line on the Vector Space',
      extends: { $ref: '#/definitions/Object' },
      properties: {
        line: {
          type: 'array',
          description: 'Coordinates of the line',
          items: { $ref: '#/definitions/Coordinate' }
        }
      },
      required: [ 'id', 'line' ]
    },

    Layer: {
      id: 'Layer',
      type: 'object',
      description: 'Vector Space Layer',
      extends: { $ref: '#/definitions/Object' },
      properties: {
        name: {
          type: 'string',
          description: 'Name of the layer'
        }
      },
      required: [ 'id', 'name' ]
    }
  }
};
