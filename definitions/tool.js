"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Vector Space Tool Interface definition',
    definitions: {
        ToolAction: {
            id: 'ToolAction',
            type: 'object',
            description: 'Action handler',
            propertiese: {
                name: {
                    type: 'string',
                    description: 'Label for the action'
                },
                description: {
                    type: 'string',
                    description: 'Desciption for the action'
                },
                handler: {
                    type: 'function',
                    description: 'Handler function for the action',
                    parameters: [
                        {
                            name: 'interaction',
                            oneOf: [
                                {
                                    $ref: 'interaction'
                                }
                            ]
                        }
                    ]
                }
            },
            required: ['handler']
        }
    },
    id: 'Tool',
    type: 'object',
    description: `
    Interface for a Vector Space tool.

    The tool should have a name, description and icon and a collection of
    actions that the tool implements.

    The click action should be used for the generation of singular events,
    eg the generation of a point

    The combination of start, update, stop, cancel and click can be used for
    multi-point events or joined events. When given, the update, stop, cancel
    and click actions will be attached automatically to the related events.
    For example, a connected lines tool, \`start\` would set the initial point,
    update would draw a temporary line between the last point and the cursor,
    \`click\` would add a point to the line, \`stop\` would add the last point and
    complete the line and cancel would cancel the entire line. If the tool and
    the \`start\` action was connected to a \`click\` event, \`update\` will be
    attached to \`mousemove\` events, \`click\` to subsequent \`click\` events, and
    the \`stop\` and \`cancel\` actions would be attached depending on the
    configuration.

    If just start and stop actions are given without a click action, it will
    be assumed that the tool only has a drag behaviour. If start, stop and click
    actions are given, it will be assumed that the tool only has a multiple
    click behaviour unless draggable is set to \`true\`
  `,
    properties: {
        name: {
            type: 'string',
            description: 'Name of the tool'
        },
        description: {
            type: 'string',
            description: 'Description of the tool'
        },
        icon: {
            type: 'string',
            description: 'FontAwesome class name for tool icon'
        },
        actions: {
            type: 'object',
            description: 'Tool actions',
            properties: {
                start: {
                    oneOf: [
                        {
                            $ref: '#/definitions/ToolAction'
                        }
                    ],
                    description: `
            Standard action associated with the start of interaction with the
            Vector Space, eg mousedown
          `
                },
                update: {
                    oneOf: [
                        {
                            $ref: '#/definitions/ToolAction'
                        }
                    ],
                    description: `
            Standar action associated with the continuing of an interaction with
            the Vector Space, eg mousemove
          `
                },
                stop: {
                    oneOf: [
                        {
                            $ref: '#/definitions/ToolAction'
                        }
                    ],
                    description: `
            Standard action associate with the completion of an interaction with
            the Vector Space, eg mouseup
          `
                },
                cancel: {
                    oneOf: [
                        {
                            $ref: '#/definitions/ToolAction'
                        }
                    ],
                    description: `
            Standard action associated with the cancellation of ainteraction
            with the Vector Space
          `
                },
                click: {
                    oneOf: [
                        {
                            $ref: '#/definitions/ToolAction'
                        }
                    ],
                    description: `
            Standard action associated with the clicking/tapping of the Vector
            Space
          `
                }
            },
            additionalProperties: {
                $ref: '#/definitions/ToolAction'
            },
            minProperties: 1
        },
        draggable: {
            description: `If true, if a click action is given with a start and stop
        action, the tool will be able to be configured with both a click
        action and a drag action
      `,
            type: 'boolean'
        }
    },
    required: ['name', 'description']
};
