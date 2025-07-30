/**
 * Function to retrieve sale details from Gumroad.
 *
 * @param {Object} args - Arguments for the sale retrieval.
 * @param {string} args.sale_id - The unique identifier of the sale.
 * @returns {Promise<Object>} - The details of the sale.
 */
const executeFunction = async ({ sale_id }) => {
  const baseUrl = 'https://api.gumroad.com/v2/sales';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the sale_id
    const url = `${baseUrl}/${sale_id}`;

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
    console.error('Error retrieving sale details:', error);
    return { error: 'An error occurred while retrieving sale details.' };
  }
};

/**
 * Tool configuration for retrieving sale details from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_sale_details',
      description: 'Retrieve details of a specific sale from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          sale_id: {
            type: 'string',
            description: 'The unique identifier of the sale.'
          }
        },
        required: ['sale_id']
      }
    }
  }
};

export { apiTool };