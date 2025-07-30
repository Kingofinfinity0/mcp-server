/**
 * Function to get the app-scoped user's profile information from Threads API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.fields] - A comma-separated list of fields for a user on Threads.
 * @returns {Promise<Object>} - The profile information of the Threads user.
 */
const executeFunction = async ({ fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me`);
    url.searchParams.append('fields', fields);

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
    console.error('Error getting user profile information:', error);
    return { error: 'An error occurred while retrieving user profile information.' };
  }
};

/**
 * Tool configuration for getting the app-scoped user's profile information from Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user_profile',
      description: 'Get the app-scoped user\'s profile information from Threads API.',
      parameters: {
        type: 'object',
        properties: {
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for a user on Threads.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };