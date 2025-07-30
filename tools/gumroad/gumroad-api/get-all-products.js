/**
 * Function to retrieve all products from the Gumroad API.
 *
 * @returns {Promise<Object>} - The result of the product retrieval, including success status and product details.
 */
const executeFunction = async () => {
  const url = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
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
    console.error('Error retrieving products:', error);
    return { error: 'An error occurred while retrieving products.' };
  }
};

/**
 * Tool configuration for retrieving all products from the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_products',
      description: 'Retrieve all products from the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };