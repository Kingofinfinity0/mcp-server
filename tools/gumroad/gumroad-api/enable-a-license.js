/**
 * Function to enable a license for a product on Gumroad.
 *
 * @param {Object} args - Arguments for enabling a license.
 * @param {string} args.access_token - The OAuth 2.0 access token for authenticating the API request.
 * @param {string} args.product_id - The unique ID of the product associated with the license.
 * @param {string} args.license_key - The license key provided by the customer.
 * @returns {Promise<Object>} - The result of the license enabling operation.
 */
const executeFunction = async ({ access_token, product_id, license_key }) => {
  const url = 'https://api.gumroad.com/v2/licenses/enable';
  const token = process.env.GUMROAD_API_KEY;

  const body = new URLSearchParams();
  body.append('access_token', access_token);
  body.append('product_id', product_id);
  body.append('license_key', license_key);

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
    console.error('Error enabling license:', error);
    return { error: 'An error occurred while enabling the license.' };
  }
};

/**
 * Tool configuration for enabling a license on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'enable_license',
      description: 'Enable a license for a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            description: 'The OAuth 2.0 access token for authenticating the API request.'
          },
          product_id: {
            type: 'string',
            description: 'The unique ID of the product associated with the license.'
          },
          license_key: {
            type: 'string',
            description: 'The license key provided by the customer.'
          }
        },
        required: ['access_token', 'product_id', 'license_key']
      }
    }
  }
};

export { apiTool };