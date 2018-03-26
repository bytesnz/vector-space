"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Vector Space User messages',
    description: `
    Messages that can be (sent or?) received for communicating user details
    and updates to user details
  `,
    definitions: {
        Details: {
            type: 'object',
            description: 'Array of user details',
            extends: { $ref: 'message' },
            properties: {
                data: {
                    type: 'array',
                    items: {
                        $ref: '../user'
                    }
                }
            },
            required: ['data']
        },
        Updates: {
            type: 'object',
            extends: { $ref: 'message' },
            properties: {
                data: {
                    type: 'array',
                    items: {
                        $ref: '../user#/definitions/User'
                    }
                }
            },
            required: ['data']
        }
    }
};
