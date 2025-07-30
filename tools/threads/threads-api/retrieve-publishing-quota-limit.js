/**
 * Function to retrieve the publishing quota limit for a user on Threads.
 *
 * @returns {Promise<Object>} - The user's current Threads API publishing usage total.
 */
const executeFunction = async () => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  const fieldsQuota = 'quota_usage,config,reply_quota_usage,reply_config'; // default fields

  try {
    // Construct the URL for the request
    const url = new URL(`${apiHost}/me/threads_publishing_limit`);
    url.searchParams.append('fields', fieldsQuota);

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
    console.error('Error retrieving publishing quota limit:', error);
    return { error: 'An error occurred while retrieving the publishing quota limit.' };
  }
};

/**
 * Tool configuration for retrieving the publishing quota limit on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_publishing_quota_limit',
      description: 'Retrieve the publishing quota limit for a user on Threads.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };