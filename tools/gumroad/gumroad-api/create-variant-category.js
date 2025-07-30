/**
 * Function to create a new variant category for a specific product in Gumroad.
 *
 * @param {Object} args - Arguments for creating a variant category.
 * @param {string} args.product_id - The unique identifier of the product.
 * @param {string} args.name - The name of the variant category.
 * @param {Array<Object>} args.options - An array of options available under this category.
 * @param {string} args.options[].name - The name of each option within the category.
 * @param {number} [args.options[].price_diff] - Price difference for each option (if applicable).
 * @returns {Promise<Object>} - The result of the variant category creation.
 */
const executeFunction = async ({ product_id, name, options }) => {
  const baseUrl = 'https://api.gumroad.com/products';
  const accessToken = ''; // will be provided by the user

  try {
    const url = `${baseUrl}/${product_id}/variant_categories`;

    const body = JSON.stringify({
      name,
      options
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating variant category:', error);
    return { error: 'An error occurred while creating the variant category.' };
  }
};

/**
 * Tool configuration for creating a variant category in Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_variant_category',
      description: 'Create a new variant category for a specific product in Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The unique identifier of the product.'
          },
          name: {
            type: 'string',
            description: 'The name of the variant category.'
          },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of each option within the category.'
                },
                price_diff: {
                  type: 'number',
                  description: 'Price difference for each option (if applicable).'
                }
              },
              required: ['name']
            },
            description: 'An array of options available under this category.'
          }
        },
        required: ['product_id', 'name', 'options']
      }
    }
  }
};

export { apiTool };