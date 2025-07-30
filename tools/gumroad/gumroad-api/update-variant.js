/**
 * Function to update a variant of a product on Gumroad.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.variant_category_id - The ID of the variant category.
 * @param {string} args.id - The ID of the variant to update.
 * @param {Object} args.variantData - The data to update the variant with.
 * @param {string} args.variantData.name - The new name of the variant.
 * @param {number} args.variantData.price_difference - The price difference from the base product price.
 * @param {Object} args.variantData.purchasing_power_parity_prices - Price adjusted for purchasing power parity.
 * @param {boolean} args.variantData.is_pay_what_you_want - Indicates if the variant is pay-what-you-want.
 * @param {Object} args.variantData.recurrence_prices - Recurrence prices for the variant.
 * @returns {Promise<Object>} - The result of the variant update.
 */
const executeFunction = async ({ product_id, variant_category_id, id, variantData }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/${product_id}/variant_categories/${variant_category_id}/variants/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(variantData)
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
    console.error('Error updating variant:', error);
    return { error: 'An error occurred while updating the variant.' };
  }
};

/**
 * Tool configuration for updating a variant on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_variant',
      description: 'Update a variant of a product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product.'
          },
          variant_category_id: {
            type: 'string',
            description: 'The ID of the variant category.'
          },
          id: {
            type: 'string',
            description: 'The ID of the variant to update.'
          },
          variantData: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The new name of the variant.'
              },
              price_difference: {
                type: 'number',
                description: 'The price difference from the base product price.'
              },
              purchasing_power_parity_prices: {
                type: 'object',
                properties: {
                  US: { type: 'number' },
                  IN: { type: 'number' },
                  EC: { type: 'number' }
                },
                description: 'Price adjusted for purchasing power parity.'
              },
              is_pay_what_you_want: {
                type: 'boolean',
                description: 'Indicates if the variant is pay-what-you-want.'
              },
              recurrence_prices: {
                type: 'object',
                properties: {
                  monthly: {
                    type: 'object',
                    properties: {
                      price_cents: { type: 'number' },
                      suggested_price_cents: { type: 'number' }
                    }
                  }
                },
                description: 'Recurrence prices for the variant.'
              }
            },
            required: ['name']
          }
        },
        required: ['product_id', 'variant_category_id', 'id', 'variantData']
      }
    }
  }
};

export { apiTool };