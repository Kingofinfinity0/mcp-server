/**
 * Function to add a new variant to an existing variant category for a specific product in Gumroad.
 *
 * @param {Object} args - Arguments for adding a variant.
 * @param {string} args.product_id - The ID of the product to which the variant will be added.
 * @param {string} args.variant_category_id - The ID of the variant category to which the variant will belong.
 * @param {string} args.name - The name of the variant.
 * @param {number} [args.price_difference] - The price difference from the base product price.
 * @param {Object} [args.purchasing_power_parity_prices] - Prices for different markets based on purchasing power parity.
 * @returns {Promise<Object>} - The result of the variant addition.
 */
const executeFunction = async ({ product_id, variant_category_id, name, price_difference, purchasing_power_parity_prices }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  const body = {
    name,
    price_difference,
    purchasing_power_parity_prices
  };

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/${product_id}/variant_categories/${variant_category_id}/variants`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error adding variant:', error);
    return { error: 'An error occurred while adding the variant.' };
  }
};

/**
 * Tool configuration for adding a variant to a product in Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_variant',
      description: 'Add a new variant to an existing variant category for a specific product in Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product to which the variant will be added.'
          },
          variant_category_id: {
            type: 'string',
            description: 'The ID of the variant category to which the variant will belong.'
          },
          name: {
            type: 'string',
            description: 'The name of the variant.'
          },
          price_difference: {
            type: 'number',
            description: 'The price difference from the base product price.'
          },
          purchasing_power_parity_prices: {
            type: 'object',
            description: 'Prices for different markets based on purchasing power parity.'
          }
        },
        required: ['product_id', 'variant_category_id', 'name']
      }
    }
  }
};

export { apiTool };