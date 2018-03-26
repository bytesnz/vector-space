import { JSONSchema4 } from 'json-schema';

export default <JSONSchema4>{
  title: 'Vector Space History Object definitions',
  definitions: {
    History: {
      type: 'array',
      items: {
        $ref: '#definitions/HistoryItem'
      }
    },
    HistoryItem: {
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
        type: {
          type: 'string',
          description: 'The type of history event recorded in this history object'
        },
      }
    }
  }
};
