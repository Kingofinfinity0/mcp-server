/**
 * Function to get resource subscription details from Gumroad API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.resource_subscription_id - The unique identifier for the resource subscription.
 * @returns {Promise<Object>} - The details of the resource subscription.
 */
const executeFunction = async ({ resource_subscription_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/resource_subscriptions';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the resource subscription ID
    const url = `${baseUrl}/${resource_subscription_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error fetching resource subscription details:', error);
    return { error: 'An error occurred while fetching resource subscription details.' };
  }
};

/**
 * Tool configuration for getting resource subscription details from Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_resource_subscription_details',
      description: 'Retrieve details of a specific resource subscription from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          resource_subscription_id: {
            type: 'string',
            description: 'The unique identifier for the resource subscription.'
          }
        },
        required: ['resource_subscription_id']
      }
    }
  }
};

export { apiTool };