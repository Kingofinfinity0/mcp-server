/**
 * Function to update an offer code for a specific product in the Gumroad API.
 *
 * @param {Object} args - Arguments for updating the offer code.
 * @param {string} args.product_id - The ID of the product associated with the offer code.
 * @param {string} args.id - The ID of the offer code to be updated.
 * @param {number} [args.discount_percentage] - The new discount percentage for the offer code.
 * @param {string} [args.expiration_date] - The new expiration date for the offer code (ISO 8601).
 * @param {number} [args.max_purchase_count] - The maximum number of times the offer code can be used.
 * @returns {Promise<Object>} - The result of the offer code update.
 */
const executeFunction = async ({ product_id, id, discount_percentage, expiration_date, max_purchase_count }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${product_id}/offer_codes/${id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Construct the request body
    const body = JSON.stringify({
      discount_percentage,
      expiration_date,
      max_purchase_count
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
    console.error('Error updating offer code:', error);
    return { error: 'An error occurred while updating the offer code.' };
  }
};

/**
 * Tool configuration for updating an offer code in the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_offer_code',
      description: 'Update an existing offer code for a specific product in the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product associated with the offer code.'
          },
          id: {
            type: 'string',
            description: 'The ID of the offer code to be updated.'
          },
          discount_percentage: {
            type: 'number',
            description: 'The new discount percentage for the offer code.'
          },
          expiration_date: {
            type: 'string',
            description: 'The new expiration date for the offer code (ISO 8601).'
          },
          max_purchase_count: {
            type: 'number',
            description: 'The maximum number of times the offer code can be used.'
          }
        },
        required: ['product_id', 'id']
      }
    }
  }
};

export { apiTool };