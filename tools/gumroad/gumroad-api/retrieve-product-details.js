/**
 * Function to retrieve product details from the Gumroad API.
 *
 * @param {Object} args - Arguments for the product retrieval.
 * @param {string} args.product_id - The unique identifier of the product to retrieve.
 * @returns {Promise<Object>} - The result of the product retrieval.
 */
const executeFunction = async ({ product_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the product ID
    const url = `${baseUrl}/${product_id}`;

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
    console.error('Error retrieving product details:', error);
    return { error: 'An error occurred while retrieving product details.' };
  }
};

/**
 * Tool configuration for retrieving product details from the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_product_details',
      description: 'Retrieve details of a specific product from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product to retrieve.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };