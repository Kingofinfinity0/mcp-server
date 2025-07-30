/**
 * Function to update a variant category for a specific product on Gumroad.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.product_id - The ID of the product.
 * @param {string} args.id - The ID of the variant category to update.
 * @param {string} args.name - The new name for the variant category.
 * @param {Array<Object>} args.options - An array of options for the variant category.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ product_id, id, name, options }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${product_id}/variant_categories/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Create the request body
    const body = JSON.stringify({ name, options });

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
    console.error('Error updating variant category:', error);
    return { error: 'An error occurred while updating the variant category.' };
  }
};

/**
 * Tool configuration for updating a variant category on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_variant_category',
      description: 'Update a variant category for a specific product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product.'
          },
          id: {
            type: 'string',
            description: 'The ID of the variant category to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the variant category.'
          },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The name of the option within the variant.'
                },
                price_difference: {
                  type: 'integer',
                  description: 'Price difference for the option.'
                }
              },
              required: ['name']
            },
            description: 'An array of options for the variant category.'
          }
        },
        required: ['product_id', 'id', 'name', 'options']
      }
    }
  }
};

export { apiTool };