
export default {
  id: 'Connection',
  description: 'Vector Space Connection Interface',
  type: 'object',
  properties: {
    subscribe: {
      type: 'function',
      description: 'Subscribes to data and updates from the server',
      parameters: [
        {
          id: 'channel',
          description: 'Channel to subscribe to',
          type: 'string'
        },
        {
          id: 'handler',
          description: 'Function to handle data from subscription',
          type: 'function',
          parameters: [
            {
              id: 'error',
              description: 'Error from the subscription'
            },
            {
              id: 'data',
              description: 'Data from the subscription'
            }
          ]
        },
        {
          id: 'options',
          description: 'Channel subscription options',
          type: 'object',
          optional: true
        }
      ],
      returnValue: {
        type: 'number',
        description: 'Subscription ID'
      }
    },
    unsubscribe: {
      type: 'function',
      description: 'Unsubscribes to an existing data subscription',
      parameters: [
        {
          id: 'subscriptionId',
          type: 'number',
          description: 'ID of subscription to unsubsction from'
        }
      ]
    },
    interaction: {
      type: 'function',
      description: 'Commits an interaction to the drawing',
      parameters: [
        {
          name: 'drawingId',
          description: 'The ID of the drawing to add the interaction to',
          oneOf: [
            {
              $ref: 'schema/objects#/definitions/ID'
            }
          ]
        },
        {
          name: 'lastInteraction',
          description: `
            The last interaction ID in the drawing history known by the
            instance. This is used to to determine the order of any conflicts
          `,
          oneOf: [
            {
              $ref: 'schema/objects#/definitions/ID'
            }
          ]
        },
        {
          name: 'interaction',
          description: 'The interaction',
          oneOf: [
            {
              $ref: 'schema/history#/definitions/Interaction'
            }
          ]
        }
      ],
      returnValue: {
        type: 'Promise',
      }
    }
  },
  definitions: {
    BaseSubscriptionError: {
      id: 'BaseSubscriptionError',
      type: 'object',
      properties: {
        type: {
          type: 'string'
        }
      }
    },
    SubscriptionError: {
      id: 'SubscriptionError',
      oneOf: [
        {
          type: 'object',
          description: 'Error when the connection disconnects and the subscription is removed',
          extends: {
            $ref: '#/definitions/BaseSubscriptionError'
          },
          properties: {
            type: {
              type: 'string',
              enum: [ 'disconnection' ]
            }
          }
        }
      ]
    }
  }
};
