/**
 * Function to delete a product from Gumroad.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.product_id - The unique identifier of the product to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the delete request
    const url = `${baseUrl}/${product_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
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
    console.error('Error deleting product:', error);
    return { error: 'An error occurred while deleting the product.' };
  }
};

/**
 * Tool configuration for deleting a product from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_product',
      description: 'Delete a product from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product to be deleted.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };