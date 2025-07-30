/**
 * Function to mark a sale as shipped in the Gumroad API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.id - The unique identifier of the sale to be marked as shipped.
 * @param {string} args.tracking_url - The URL for tracking the shipment, if available.
 * @returns {Promise<Object>} - The result of the operation indicating success and sale details.
 */
const executeFunction = async ({ id, tracking_url }) => {
  const baseUrl = 'https://api.gumroad.com/v2/sales';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${id}/mark_as_shipped`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    };

    // Prepare the body of the request
    const body = new URLSearchParams();
    if (tracking_url) {
      body.append('tracking_url', tracking_url);
    }

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
    console.error('Error marking sale as shipped:', error);
    return { error: 'An error occurred while marking the sale as shipped.' };
  }
};

/**
 * Tool configuration for marking a sale as shipped in the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'mark_sale_as_shipped',
      description: 'Mark a sale as shipped in the Gumroad API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The unique identifier of the sale to be marked as shipped.'
          },
          tracking_url: {
            type: 'string',
            description: 'The URL for tracking the shipment, if available.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };