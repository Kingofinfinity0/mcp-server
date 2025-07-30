/**
 * Function to create an offer code for a product on Gumroad.
 *
 * @param {Object} args - Arguments for creating the offer code.
 * @param {string} args.product_id - The ID of the product for which the offer code is being created.
 * @param {string} args.name - The name of the offer code.
 * @param {number} args.amount_off - The amount off in cents.
 * @param {string} args.offer_type - The type of offer (e.g., "cents").
 * @returns {Promise<Object>} - The result of the offer code creation.
 */
const executeFunction = async ({ product_id, name, amount_off, offer_type }) => {
  const url = `https://api.gumroad.com/v2/products/${product_id}/offer_codes`;
  const accessToken = ''; // will be provided by the user

  const body = JSON.stringify({
    name,
    amount_off,
    offer_type
  });

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
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
    console.error('Error creating offer code:', error);
    return { error: 'An error occurred while creating the offer code.' };
  }
};

/**
 * Tool configuration for creating an offer code on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_offer_code',
      description: 'Create an offer code for a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product for which the offer code is being created.'
          },
          name: {
            type: 'string',
            description: 'The name of the offer code.'
          },
          amount_off: {
            type: 'number',
            description: 'The amount off in cents.'
          },
          offer_type: {
            type: 'string',
            description: 'The type of offer (e.g., "cents").'
          }
        },
        required: ['product_id', 'name', 'amount_off', 'offer_type']
      }
    }
  }
};

export { apiTool };