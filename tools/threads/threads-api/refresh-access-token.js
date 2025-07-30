/**
 * Function to refresh the access token for the Threads API.
 *
 * @returns {Promise<Object>} - The result of the access token refresh.
 */
const executeFunction = async () => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for refreshing the access token
    const url = new URL(`${apiHost}/refresh_access_token`);
    url.searchParams.append('grant_type', 'th_refresh_token');

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
    console.error('Error refreshing access token:', error);
    return { error: 'An error occurred while refreshing the access token.' };
  }
};

/**
 * Tool configuration for refreshing the access token for the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'refresh_access_token',
      description: 'Refresh the access token for the Threads API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };