/**
 * Function to get subscriber details from Gumroad.
 *
 * @param {Object} args - Arguments for the subscriber details retrieval.
 * @param {string} args.subscriber_id - The unique identifier of the subscriber.
 * @returns {Promise<Object>} - The details of the subscriber.
 */
const executeFunction = async ({ subscriber_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/subscribers';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the subscriber_id
    const url = `${baseUrl}/${subscriber_id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
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
    console.error('Error retrieving subscriber details:', error);
    return { error: 'An error occurred while retrieving subscriber details.' };
  }
};

/**
 * Tool configuration for getting subscriber details from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_subscriber_details',
      description: 'Retrieve details of a subscriber from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          subscriber_id: {
            type: 'string',
            description: 'The unique identifier of the subscriber.'
          }
        },
        required: ['subscriber_id']
      }
    }
  }
};

export { apiTool };