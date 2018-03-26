"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
