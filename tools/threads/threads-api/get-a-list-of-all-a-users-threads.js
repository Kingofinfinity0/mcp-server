/**
 * Function to get a list of all threads created by a user.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.fields] - A comma-separated list of fields for media objects on Threads.
 * @param {number} [args.limit=50] - The maximum number of media objects or records to return.
 * @returns {Promise<Object>} - The result of the request to get user's threads.
 */
const executeFunction = async ({ fields, limit = 50 }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('fields', fields);
    url.searchParams.append('limit', limit.toString());

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
    console.error('Error fetching user threads:', error);
    return { error: 'An error occurred while fetching user threads.' };
  }
};

/**
 * Tool configuration for getting a list of all user's threads on Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user_threads',
      description: 'Get a list of all threads created by a user.',
      parameters: {
        type: 'object',
        properties: {
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for media objects on Threads.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of media objects or records to return.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };