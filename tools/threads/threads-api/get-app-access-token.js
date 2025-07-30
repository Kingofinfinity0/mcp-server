/**
 * Function to get the app access token from the Threads API.
 *
 * @returns {Promise<Object>} - The app access token response.
 */
const executeFunction = async () => {
  const apiHost = 'https://graph.threads.net';
  const appId = ''; // will be provided by the user
  const appSecret = ''; // will be provided by the user

  try {
    // Construct the URL for the access token request
    const url = new URL(`${apiHost}/oauth/access_token`);
    url.searchParams.append('grant_type', 'client_credentials');
    url.searchParams.append('client_id', appId);
    url.searchParams.append('client_secret', appSecret);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
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
    console.error('Error getting app access token:', error);
    return { error: 'An error occurred while getting the app access token.' };
  }
};

/**
 * Tool configuration for getting the app access token from the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_app_access_token',
      description: 'Get the app access token from the Threads API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };