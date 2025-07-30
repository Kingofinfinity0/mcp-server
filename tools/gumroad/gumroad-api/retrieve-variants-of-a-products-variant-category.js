/**
 * Function to retrieve variants of a product's variant category from the Gumroad API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.variant_category_id - The ID of the variant category.
 * @returns {Promise<Object>} - The result of the API call, including success status and variants.
 */
const executeFunction = async ({ product_id, variant_category_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/${product_id}/variant_categories/${variant_category_id}/variants`;

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
    console.error('Error retrieving variants:', error);
    return { error: 'An error occurred while retrieving variants.' };
  }
};

/**
 * Tool configuration for retrieving variants of a product's variant category from the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_product_variants',
      description: 'Retrieve variants of a product\'s variant category from the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product.'
          },
          variant_category_id: {
            type: 'string',
            description: 'The ID of the variant category.'
          }
        },
        required: ['product_id', 'variant_category_id']
      }
    }
  }
};

export { apiTool };