/**
 * Function to enable a product on Gumroad.
 *
 * @param {Object} args - Arguments for enabling the product.
 * @param {string} args.product_id - The unique identifier of the product to be enabled.
 * @returns {Promise<Object>} - The result of the enable product operation.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${product_id}/enable`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
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
    console.error('Error enabling product:', error);
    return { error: 'An error occurred while enabling the product.' };
  }
};

/**
 * Tool configuration for enabling a product on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'enable_product',
      description: 'Enable a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product to be enabled.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };