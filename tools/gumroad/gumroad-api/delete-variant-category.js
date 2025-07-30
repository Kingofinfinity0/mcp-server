/**
 * Function to delete a variant category associated with a product on Gumroad.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.id - The ID of the variant category to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ product_id, id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${product_id}/variant_categories/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting variant category:', error);
    return { error: 'An error occurred while deleting the variant category.' };
  }
};

/**
 * Tool configuration for deleting a variant category on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_variant_category',
      description: 'Delete a variant category associated with a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product.'
          },
          id: {
            type: 'string',
            description: 'The ID of the variant category to delete.'
          }
        },
        required: ['product_id', 'id']
      }
    }
  }
};

export { apiTool };