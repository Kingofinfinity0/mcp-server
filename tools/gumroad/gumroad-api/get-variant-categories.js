/**
 * Function to get variant categories for a specific product from Gumroad.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.product_id - The unique identifier of the product whose variant categories are being retrieved.
 * @returns {Promise<Object>} - The response from the Gumroad API containing variant categories.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the product_id
    const url = `${baseUrl}/${product_id}/variant_categories`;

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
    console.error('Error retrieving variant categories:', error);
    return { error: 'An error occurred while retrieving variant categories.' };
  }
};

/**
 * Tool configuration for getting variant categories from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_variant_categories',
      description: 'Retrieve variant categories for a specific product from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product whose variant categories are being retrieved.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };