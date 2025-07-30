/**
 * Function to delete an offer code associated with a product in the Gumroad API.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.product_id - The ID of the product associated with the offer code.
 * @param {string} args.id - The ID of the offer code to be deleted.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ product_id, id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${product_id}/offer_codes/${id}`;

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
    console.error('Error deleting offer code:', error);
    return { error: 'An error occurred while deleting the offer code.' };
  }
};

/**
 * Tool configuration for deleting an offer code in the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_offer_code',
      description: 'Delete an offer code associated with a product in the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product associated with the offer code.'
          },
          id: {
            type: 'string',
            description: 'The ID of the offer code to be deleted.'
          }
        },
        required: ['product_id', 'id']
      }
    }
  }
};

export { apiTool };