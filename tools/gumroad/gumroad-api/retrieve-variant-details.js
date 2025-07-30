/**
 * Function to retrieve variant details from Gumroad.
 *
 * @param {Object} args - Arguments for the variant retrieval.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.variant_category_id - The ID of the variant category.
 * @param {string} args.id - The ID of the variant.
 * @returns {Promise<Object>} - The result of the variant retrieval.
 */
const executeFunction = async ({ product_id, variant_category_id, id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/${product_id}/variant_categories/${variant_category_id}/variants/${id}`;

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
    console.error('Error retrieving variant details:', error);
    return { error: 'An error occurred while retrieving variant details.' };
  }
};

/**
 * Tool configuration for retrieving variant details from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_variant_details',
      description: 'Retrieve detailed information about a specific variant of a product.',
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
          },
          id: {
            type: 'string',
            description: 'The ID of the variant.'
          }
        },
        required: ['product_id', 'variant_category_id', 'id']
      }
    }
  }
};

export { apiTool };