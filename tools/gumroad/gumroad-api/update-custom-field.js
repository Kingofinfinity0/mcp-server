/**
 * Function to update a custom field for a specific product on Gumroad.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.product_id - The ID of the product to update.
 * @param {string} args.name - The name of the custom field to update.
 * @param {string} args.value - The new value for the custom field.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ product_id, name, value }) => {
  const baseUrl = 'https://api.gumroad.com/v2/products';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with path parameters
    const url = `${baseUrl}/${product_id}/custom_fields/${name}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    };

    // Prepare the body of the request
    const body = new URLSearchParams();
    body.append('value', value);

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: body.toString()
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
    console.error('Error updating custom field:', error);
    return { error: 'An error occurred while updating the custom field.' };
  }
};

/**
 * Tool configuration for updating a custom field on Gumroad.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_custom_field',
      description: 'Update a custom field for a specific product on Gumroad.',
      parameters: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
            description: 'The ID of the product to update.'
          },
          name: {
            type: 'string',
            description: 'The name of the custom field to update.'
          },
          value: {
            type: 'string',
            description: 'The new value for the custom field.'
          }
        },
        required: ['product_id', 'name', 'value']
      }
    }
  }
};

export { apiTool };