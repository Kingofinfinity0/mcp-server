/**
 * Function to get account insights from the Threads API.
 *
 * @param {Object} args - Arguments for the insights request.
 * @param {string} args.user_id - The ID of the Threads user whose insights are being requested.
 * @param {string} args.metrics_account - A comma-separated list of metrics for an account on Threads.
 * @param {string} [args.breakdown] - Used for categorizing follower demographics.
 * @returns {Promise<Object>} - The insights data for the specified Threads user.
 */
const executeFunction = async ({ user_id, metrics_account, breakdown }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads_insights`);
    url.searchParams.append('metric', metrics_account);
    if (breakdown) {
      url.searchParams.append('breakdown', breakdown);
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
    console.error('Error getting account insights:', error);
    return { error: 'An error occurred while getting account insights.' };
  }
};

/**
 * Tool configuration for getting account insights from the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_account_insights',
      description: 'Get insights for a Threads user account.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'The ID of the Threads user whose insights are being requested.'
          },
          metrics_account: {
            type: 'string',
            description: 'A comma-separated list of metrics for an account on Threads.'
          },
          breakdown: {
            type: 'string',
            description: 'Used for categorizing follower demographics.'
          }
        },
        required: ['user_id', 'metrics_account']
      }
    }
  }
};

export { apiTool };