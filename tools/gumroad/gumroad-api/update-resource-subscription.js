/**
 * Function to update a resource subscription on Gumroad.
 *
 * @param {Object} args - Arguments for the resource subscription update.
 * @param {string} args.resource_name - The name of the resource to subscribe to (e.g., 'sale', 'refund').
 * @param {string} args.post_url - The URL to which notifications will be sent when the subscribed event occurs.
 * @returns {Promise<Object>} - The result of the resource subscription update.
 */
const executeFunction = async ({ resource_name, post_url }) => {
  const url = 'https://api.gumroad.com/v2/resource_subscriptions';
  const accessToken = ''; // will be provided by the user

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Prepare the body data
    const body = new URLSearchParams();
    body.append('resource_name', resource_name);
    body.append('post_url', post_url);

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
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
    console.error('Error updating resource subscription:', error);
    return { error: 'An error occurred while updating the resource subscription.' };
  }
};

/**
 * Tool configuration for updating resource subscriptions on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_resource_subscription',
      description: 'Update a resource subscription on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          resource_name: {
            type: 'string',
            description: 'The name of the resource to subscribe to (e.g., "sale", "refund").'
          },
          post_url: {
            type: 'string',
            description: 'The URL to which notifications will be sent when the subscribed event occurs.'
          }
        },
        required: ['resource_name', 'post_url']
      }
    }
  }
};

export { apiTool };