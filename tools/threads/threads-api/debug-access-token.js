/**
 * Function to debug an access token for the Threads API.
 *
 * @param {Object} args - Arguments for debugging the access token.
 * @param {string} args.input_token - The access token to be inspected.
 * @returns {Promise<Object>} - The result of the access token debug request.
 */
const executeFunction = async ({ input_token }) => {
  const apiHost = 'https://graph.threads.net';
  const token = process.env.THREADS_API_KEY;
  try {
    // Construct the URL for the debug token request
    const url = new URL(`${apiHost}/debug_token`);
    url.searchParams.append('input_token', input_token);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error debugging access token:', error);
    return { error: 'An error occurred while debugging the access token.' };
  }
};

/**
 * Tool configuration for debugging access tokens on the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'debug_access_token',
      description: 'Debug an access token for the Threads API.',
      parameters: {
        type: 'object',
        properties: {
          input_token: {
            type: 'string',
            description: 'The access token to be inspected.'
          }
        },
        required: ['input_token']
      }
    }
  }
};

export { apiTool };