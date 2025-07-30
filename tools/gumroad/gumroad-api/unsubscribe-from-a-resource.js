/**
 * Function to unsubscribe from a specific resource subscription in the Gumroad API.
 *
 * @param {Object} args - Arguments for the unsubscribe operation.
 * @param {string} args.resource_subscription_id - The unique identifier of the resource subscription to be deleted.
 * @returns {Promise<Object>} - The result of the unsubscribe operation.
 */
const executeFunction = async ({ resource_subscription_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/resource_subscriptions';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${resource_subscription_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error unsubscribing from resource:', error);
    return { error: 'An error occurred while unsubscribing from the resource.' };
  }
};

/**
 * Tool configuration for unsubscribing from a resource subscription in the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unsubscribe_from_resource',
      description: 'Unsubscribe from a specific resource subscription in the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {
          resource_subscription_id: {
            type: 'string',
            description: 'The unique identifier of the resource subscription to be deleted.'
          }
        },
        required: ['resource_subscription_id']
      }
    }
  }
};

export { apiTool };