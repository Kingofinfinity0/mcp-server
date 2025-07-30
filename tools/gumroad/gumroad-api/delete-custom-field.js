/**
 * Function to delete a custom field associated with a product on Gumroad.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.product_id - The ID of the product from which to delete the custom field.
 * @param {string} args.name - The name of the custom field to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ product_id, name }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${product_id}/custom_fields/${name}`;

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
    console.error('Error deleting custom field:', error);
    return { error: 'An error occurred while deleting the custom field.' };
  }
};

/**
 * Tool configuration for deleting a custom field on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_custom_field',
      description: 'Delete a custom field associated with a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product from which to delete the custom field.'
          },
          name: {
            type: 'string',
            description: 'The name of the custom field to delete.'
          }
        },
        required: ['product_id', 'name']
      }
    }
  }
};

export { apiTool };