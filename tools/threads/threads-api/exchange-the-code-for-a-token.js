/**
 * Function to exchange the authorization code for an access token.
 *
 * @param {Object} args - Arguments for the token exchange.
 * @param {string} args.code - The authorization code received from the authorization server.
 * @param {string} [args.redirect_uri="https://www.domain.com/login"] - The redirect URI used during authorization.
 * @returns {Promise<Object>} - The access token and user ID if successful.
 */
const executeFunction = async ({ code, redirect_uri = 'https://www.domain.com/login' }) => {
  const apiHost = 'https://graph.threads.net';
  const appId = ''; // will be provided by the user
  const appSecret = ''; // will be provided by the user

  try {
    // Construct the URL for the token exchange
    const url = new URL(`${apiHost}/oauth/access_token`);
    url.searchParams.append('client_id', appId);
    url.searchParams.append('client_secret', appSecret);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('redirect_uri', redirect_uri);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
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
    console.error('Error exchanging code for token:', error);
    return { error: 'An error occurred while exchanging the code for a token.' };
  }
};

/**
 * Tool configuration for exchanging the authorization code for an access token.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'exchange_code_for_token',
      description: 'Exchange the authorization code for an access token.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The authorization code received from the authorization server.'
          },
          redirect_uri: {
            type: 'string',
            description: 'The redirect URI used during authorization.'
          }
        },
        required: ['code']
      }
    }
  }
};

export { apiTool };