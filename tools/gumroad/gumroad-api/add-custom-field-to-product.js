/**
 * Function to add a custom field to a product on Gumroad.
 *
 * @param {Object} args - Arguments for adding a custom field.
 * @param {string} args.product_id - The ID of the product to which the custom field will be added.
 * @param {string} args.name - The name of the custom field.
 * @param {string} args.value - The value assigned to the custom field.
 * @returns {Promise<Object>} - The result of the operation indicating success or failure.
 */
const executeFunction = async ({ product_id, name, value }) => {
  const url = `https://api.gumroad.com/v2/products/${product_id}/custom_fields`;
  const accessToken = ''; // will be provided by the user

  const body = new URLSearchParams();
  body.append('name', name);
  body.append('value', value);

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
    console.error('Error adding custom field to product:', error);
    return { error: 'An error occurred while adding the custom field.' };
  }
};

/**
 * Tool configuration for adding a custom field to a product on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_custom_field_to_product',
      description: 'Add a custom field to a specific product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product to which the custom field will be added.'
          },
          name: {
            type: 'string',
            description: 'The name of the custom field.'
          },
          value: {
            type: 'string',
            description: 'The value assigned to the custom field.'
          }
        },
        required: ['product_id', 'name', 'value']
      }
    }
  }
};

export { apiTool };