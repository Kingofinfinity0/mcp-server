/**
 * Function to decrement the license uses count for a product on Gumroad.
 *
 * @param {Object} args - Arguments for the decrement license uses count.
 * @param {string} args.product_id - The unique ID of the product.
 * @param {string} args.license_key - The key of the license whose usage count is to be decremented.
 * @returns {Promise<Object>} - The result of the decrement license uses count operation.
 */
const executeFunction = async ({ product_id, license_key }) => {
  const url = 'https://api.gumroad.com/v2/licenses/decrement_uses_count';
  const accessToken = ''; // will be provided by the user

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      product_id,
      license_key
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body
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
    console.error('Error decrementing license uses count:', error);
    return { error: 'An error occurred while decrementing license uses count.' };
  }
};

/**
 * Tool configuration for decrementing license uses count on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'decrement_license_uses_count',
      description: 'Decrement the license uses count for a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique ID of the product.'
          },
          license_key: {
            type: 'string',
            description: 'The key of the license whose usage count is to be decremented.'
          }
        },
        required: ['product_id', 'license_key']
      }
    }
  }
};

export { apiTool };