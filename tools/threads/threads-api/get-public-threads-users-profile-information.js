/**
 * Function to get the public profile information of a Threads user.
 *
 * @param {Object} args - Arguments for the profile lookup.
 * @param {string} args.username - The unique username on Threads. Must be an exact match.
 * @returns {Promise<Object>} - The result of the profile lookup.
 */
const executeFunction = async ({ username }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/profile_lookup`);
    url.searchParams.append('username', username);

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
    console.error('Error fetching user profile information:', error);
    return { error: 'An error occurred while fetching user profile information.' };
  }
};

/**
 * Tool configuration for getting public Threads user's profile information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_public_threads_user_profile',
      description: 'Get public Threads user\'s profile information.',
      parameters: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: 'Handle or unique username on Threads. Must be an exact match.'
          }
        },
        required: ['username']
      }
    }
  }
};

export { apiTool };