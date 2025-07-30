/**
 * Function to retrieve a list of a public profile's threads on Threads API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.username - The handle or unique username on Threads. Must be an exact match.
 * @param {string} [args.fields] - A comma-separated list of fields for media objects on Threads.
 * @returns {Promise<Object>} - The response from the Threads API containing the list of threads.
 */
const executeFunction = async ({ username, fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/profile_posts`);
    url.searchParams.append('username', username);
    if (fields) {
      url.searchParams.append('fields', fields);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`
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
    console.error('Error retrieving threads:', error);
    return { error: 'An error occurred while retrieving threads.' };
  }
};

/**
 * Tool configuration for retrieving a list of a public profile's threads on Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_public_profile_threads',
      description: 'Retrieve a list of a public profile\'s threads on Threads API.',
      parameters: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'The handle or unique username on Threads. Must be an exact match.'
          },
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for media objects on Threads.'
          }
        },
        required: ['username']
      }
    }
  }
};

export { apiTool };