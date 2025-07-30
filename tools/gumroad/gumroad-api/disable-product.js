/**
 * Function to disable a product on Gumroad.
 *
 * @param {Object} args - Arguments for disabling the product.
 * @param {string} args.product_id - The unique identifier of the product to be disabled.
 * @returns {Promise<Object>} - The result of the disable product operation.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the disable product endpoint
    const url = `${baseUrl}/${product_id}/disable`;

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
    console.error('Error disabling the product:', error);
    return { error: 'An error occurred while disabling the product.' };
  }
};

/**
 * Tool configuration for disabling a product on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'disable_product',
      description: 'Disable a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product to be disabled.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };