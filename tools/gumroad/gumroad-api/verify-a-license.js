/**
 * Function to verify a license key for a specific product on Gumroad.
 *
 * @param {Object} args - Arguments for the license verification.
 * @param {string} args.product_id - The unique ID of the product.
 * @param {string} args.license_key - The license key provided by the customer.
 * @param {boolean} [args.increment_uses_count=true] - Optional parameter to indicate whether to increment the usage count.
 * @returns {Promise<Object>} - The result of the license verification.
 */
const executeFunction = async ({ product_id, license_key, increment_uses_count = true }) => {
  const url = 'https://api.gumroad.com/v2/licenses/verify';
  const accessToken = ''; // will be provided by the user

  const body = new URLSearchParams();
  body.append('product_id', product_id);
  body.append('license_key', license_key);
  body.append('increment_uses_count', increment_uses_count.toString());

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error verifying license:', error);
    return { error: 'An error occurred while verifying the license.' };
  }
};

/**
 * Tool configuration for verifying a license on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'verify_license',
      description: 'Verify a license key for a specific product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique ID of the product.'
          },
          license_key: {
            type: 'string',
            description: 'The license key provided by the customer.'
          },
          increment_uses_count: {
            type: 'boolean',
            description: 'Optional parameter to indicate whether to increment the usage count.'
          }
        },
        required: ['product_id', 'license_key']
      }
    }
  }
};

export { apiTool };