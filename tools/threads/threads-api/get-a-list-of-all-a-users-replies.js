/**
 * Function to get a list of all a user's replies on Threads.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.fields] - A comma-separated list of fields for replies on Threads.
 * @param {number} [args.limit=50] - The maximum number of replies to return.
 * @param {string} [args.since] - Start date for retrieval.
 * @param {string} [args.until] - End date for retrieval.
 * @param {string} [args.before] - Cursor for pagination.
 * @param {string} [args.after] - Cursor for pagination.
 * @returns {Promise<Object>} - The result of the replies retrieval.
 */
const executeFunction = async ({ fields, limit = 50, since, until, before, after }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/replies`);
    url.searchParams.append('fields', fields);
    url.searchParams.append('limit', limit.toString());
    if (since) url.searchParams.append('since', since);
    if (until) url.searchParams.append('until', until);
    if (before) url.searchParams.append('before', before);
    if (after) url.searchParams.append('after', after);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving user replies:', error);
    return { error: 'An error occurred while retrieving user replies.' };
  }
};

/**
 * Tool configuration for retrieving a list of all a user's replies on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user_replies',
      description: 'Retrieve a list of all a user\'s replies on Threads.',
      parameters: {
        type: 'object',
        properties: {
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for replies on Threads.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of replies to return.'
          },
          since: {
            type: 'string',
            description: 'Start date for retrieval.'
          },
          until: {
            type: 'string',
            description: 'End date for retrieval.'
          },
          before: {
            type: 'string',
            description: 'Cursor for pagination.'
          },
          after: {
            type: 'string',
            description: 'Cursor for pagination.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };