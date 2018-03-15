"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Vector Space History Object definitions',
    definitions: {
        History: {
            type: 'array',
            items: {
                $ref: '#/definitions/Interaction'
            }
        },
        Interaction: {
            type: 'object',
            description: 'History object contains information on a single event that affected the vector space',
            properties: {
                time: {
                    type: 'number',
                    description: `
            Javascript UTC timestamp (in milliseconds since epoch) of when the
            event was committed
          `
                },
                user: {
                    $ref: 'user#/definitions/User/properties/id'
                },
                type: {
                    type: 'string',
                    description: 'The type of history event recorded in this history object'
                },
            }
        }
    }
};
