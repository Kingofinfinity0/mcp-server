/**
 * Function to get offer code details from Gumroad.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.product_id - The ID of the product associated with the offer code.
 * @param {string} args.id - The ID of the offer code to retrieve details for.
 * @returns {Promise<Object>} - The details of the offer code.
 */
const executeFunction = async ({ product_id, id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/${product_id}/offer_codes/${id}`;

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
    console.error('Error retrieving offer code details:', error);
    return { error: 'An error occurred while retrieving offer code details.' };
  }
};

/**
 * Tool configuration for getting offer code details from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_offer_code_details',
      description: 'Retrieve details of a specific offer code associated with a product in Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product associated with the offer code.'
          },
          id: {
            type: 'string',
            description: 'The ID of the offer code to retrieve details for.'
          }
        },
        required: ['product_id', 'id']
      }
    }
  }
};

export { apiTool };