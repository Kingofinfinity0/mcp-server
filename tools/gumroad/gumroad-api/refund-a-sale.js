/**
 * Function to refund a specific sale on Gumroad.
 *
 * @param {Object} args - Arguments for the refund operation.
 * @param {string} args.sale_id - The unique identifier of the sale to be refunded.
 * @returns {Promise<Object>} - The result of the refund operation.
 */
const executeFunction = async ({ sale_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/sales';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the refund operation
    const url = `${baseUrl}/${sale_id}/refund`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error refunding the sale:', error);
    return { error: 'An error occurred while refunding the sale.' };
  }
};

/**
 * Tool configuration for refunding a sale on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'refund_sale',
      description: 'Refund a specific sale on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          sale_id: {
            type: 'string',
            description: 'The unique identifier of the sale to be refunded.'
          }
        },
        required: ['sale_id']
      }
    }
  }
};

export { apiTool };