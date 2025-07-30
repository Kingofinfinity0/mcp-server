/**
 * Function to get active subscribers for a specific product on Gumroad.
 *
 * @param {Object} args - Arguments for the subscriber retrieval.
 * @param {string} args.product_id - The ID of the product to retrieve subscribers for.
 * @param {string} [args.email] - Filter subscribers by this email (optional).
 * @param {boolean} [args.paginated] - Set to true to limit the number of subscribers returned to 100 (optional).
 * @param {string} [args.page_key] - A key representing a page of results for pagination (optional).
 * @returns {Promise<Object>} - The result of the subscriber retrieval.
 */
const executeFunction = async ({ product_id, email, paginated = false, page_key }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${product_id}/subscribers`);
    if (email) url.searchParams.append('email', email);
    if (paginated) url.searchParams.append('paginated', paginated.toString());
    if (page_key) url.searchParams.append('page_key', page_key);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving subscribers:', error);
    return { error: 'An error occurred while retrieving subscribers.' };
  }
};

/**
 * Tool configuration for getting active subscribers on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_active_subscribers',
      description: 'Retrieve active subscribers for a specific product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product to retrieve subscribers for.'
          },
          email: {
            type: 'string',
            description: 'Filter subscribers by this email.'
          },
          paginated: {
            type: 'boolean',
            description: 'Set to true to limit the number of subscribers returned to 100.'
          },
          page_key: {
            type: 'string',
            description: 'A key representing a page of results for pagination.'
          }
        },
        required: ['product_id']
      }
    }
  }
};

export { apiTool };