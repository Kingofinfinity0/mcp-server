/**
 * Function to get variant category details from Gumroad.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.id - The ID of the variant category.
 * @returns {Promise<Object>} - The details of the variant category.
 */
const executeFunction = async ({ product_id, id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/${product_id}/variant_categories/${id}`;

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
    console.error('Error retrieving variant category details:', error);
    return { error: 'An error occurred while retrieving variant category details.' };
  }
};

/**
 * Tool configuration for getting variant category details from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_variant_category_details',
      description: 'Retrieve details of a specific variant category associated with a product.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product.'
          },
          id: {
            type: 'string',
            description: 'The ID of the variant category.'
          }
        },
        required: ['product_id', 'id']
      }
    }
  }
};

export { apiTool };