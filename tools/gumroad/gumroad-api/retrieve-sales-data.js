/**
 * Function to retrieve sales data from Gumroad.
 *
 * @param {Object} args - Arguments for retrieving sales data.
 * @param {string} [args.after] - Only return sales after this date (YYYY-MM-DD).
 * @param {string} [args.before] - Only return sales before this date (YYYY-MM-DD).
 * @param {string} [args.product_id] - Filter sales by this product ID.
 * @param {string} [args.email] - Filter sales by this email address.
 * @param {string} [args.order_id] - Filter sales by this Order ID.
 * @param {string} [args.page_key] - A key representing a page of results.
 * @returns {Promise<Object>} - The result of the sales data retrieval.
 */
const executeFunction = async ({ after, before, product_id, email, order_id, page_key }) => {
  const baseUrl = 'https://api.gumroad.com/v2/sales';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    if (after) url.searchParams.append('after', after);
    if (before) url.searchParams.append('before', before);
    if (product_id) url.searchParams.append('product_id', product_id);
    if (email) url.searchParams.append('email', email);
    if (order_id) url.searchParams.append('order_id', order_id);
    if (page_key) url.searchParams.append('page_key', page_key);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
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
    console.error('Error retrieving sales data:', error);
    return { error: 'An error occurred while retrieving sales data.' };
  }
};

/**
 * Tool configuration for retrieving sales data from Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_sales_data',
      description: 'Retrieve sales data from Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          after: {
            type: 'string',
            description: 'Only return sales after this date (YYYY-MM-DD).'
          },
          before: {
            type: 'string',
            description: 'Only return sales before this date (YYYY-MM-DD).'
          },
          product_id: {
            type: 'string',
            description: 'Filter sales by this product ID.'
          },
          email: {
            type: 'string',
            description: 'Filter sales by this email address.'
          },
          order_id: {
            type: 'string',
            description: 'Filter sales by this Order ID.'
          },
          page_key: {
            type: 'string',
            description: 'A key representing a page of results.'
          }
        }
      }
    }
  }
};

export { apiTool };