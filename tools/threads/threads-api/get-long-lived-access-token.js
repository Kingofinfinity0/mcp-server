/**
 * Function to get a long-lived access token from the Threads API.
 *
 * @param {string} shortLivedToken - The short-lived Threads user access token to exchange.
 * @returns {Promise<Object>} - The response containing the long-lived access token and its details.
 */
const executeFunction = async (shortLivedToken) => {
  const apiHost = 'https://graph.threads.net';
  const appSecret = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/access_token`);
    url.searchParams.append('grant_type', 'th_exchange_token');
    url.searchParams.append('client_secret', appSecret);
    url.searchParams.append('short_lived_token', shortLivedToken);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
    console.error('Error getting long-lived access token:', error);
    return { error: 'An error occurred while getting the long-lived access token.' };
  }
};

/**
 * Tool configuration for getting a long-lived access token from the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_long_lived_access_token',
      description: 'Get a long-lived access token from the Threads API.',
      parameters: {
        type: 'object',
        properties: {
          shortLivedToken: {
            type: 'string',
            description: 'The short-lived Threads user access token to exchange.'
          }
        },
        required: ['shortLivedToken']
      }
    }
  }
};

export { apiTool };