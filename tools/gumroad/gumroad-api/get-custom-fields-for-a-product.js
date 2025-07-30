/**
 * Function to get custom fields for a specific product from Gumroad.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.product_id - The unique identifier of the product whose custom fields are being retrieved.
 * @returns {Promise<Object>} - The result of the custom fields retrieval.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the product ID
    const url = `${baseUrl}/${product_id}/custom_fields`;

    // Set up headers for the request
    const headers = {
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
    console.error('Error retrieving custom fields:', error);
    return { error: 'An error occurred while retrieving custom fields.' };
  }
};

/**
 * Tool configuration for getting custom fields for a product from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_custom_fields',
      description: 'Retrieve custom fields for a specific product from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product whose custom fields are being retrieved.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };