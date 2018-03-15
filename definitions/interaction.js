"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Vector Space Interaction event definition',
    id: 'Interaction',
    type: 'object',
    description: `
    Interaction event used to pass an interaction with a Vector Space to tools
    and other listeners
  `,
    definitions: {
        InteractionType: {
            type: 'string',
            description: 'The type of interaction',
            enum: [
                'point',
                'multipoint',
                'key'
            ]
        },
        AttachmentType: {
            type: 'string',
            description: `
        If part of an interaction attachment series, the type of series the
        event is part of
      `,
            enum: [
                'click',
                'drag'
            ]
        }
    },
    properties: {
        /*TODO event: {
          $ref: 'Event'
        },*/
        type: {
            $ref: '#/definitions/InteractionType'
        },
        attachmentType: {
            $ref: '#/definitions/AttachmentType'
        },
        coordinates: {
            oneOf: [
                {
                    $ref: 'schema/objects#/definitions/Coordinate'
                },
                {
                    type: 'array',
                    description: 'Array of coordinates of the interaction',
                    items: {
                        $ref: 'schema/objects#/definitions/Coordinate'
                    }
                }
            ]
        },
        middleCoordinates: {
            $ref: 'schema/objects#/definitions/Coordinate'
        }
    },
    required: ['event', 'type', 'coordinates']
};
