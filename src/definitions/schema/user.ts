import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  id: 'User',
  title: 'Vector Space user object definitions',
  definitions: {
    User: {
      id: 'User',
      type: 'object',
      description: 'User',
      properties: {
        id: {
          $ref: 'objects#/definitions/ID'
        },
        displayName: {
          type: 'string',
          description: 'Display name for the user'
        }
      },
      required: [ 'id' ]
    },
    Permission: {
      id: 'Permission',
      type: 'object',
      description: 'A collection of users/groups that have a particular permission',
      properties: {
        users: {
          type: 'array',
          items: {
            $ref: 'objects#/definitions/ID'
          }
        },
        groups: {
          type: 'array',
          items: {
            $ref: 'objects#/definitions/ID'
          }
        }
      }
    }
  },
  type: 'object',
  extends: { $ref: '#/definitions/User' },
  required: [ 'id', 'displayName' ]
};
