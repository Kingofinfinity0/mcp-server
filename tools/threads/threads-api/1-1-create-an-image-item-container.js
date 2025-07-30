/**
 * Function to create an image item container in Threads API.
 *
 * @param {Object} args - Arguments for creating an image item container.
 * @param {string} args.image_url - The URL of the image to be uploaded.
 * @param {string} [args.alt_text="An example image."] - The accessibility label or alt text for the image.
 * @returns {Promise<Object>} - The response from the Threads API after creating the image item container.
 */
const executeFunction = async ({ image_url, alt_text = "An example image." }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('media_type', 'IMAGE');
    url.searchParams.append('image_url', image_url);
    url.searchParams.append('is_carousel_item', 'true');
    url.searchParams.append('alt_text', alt_text);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers
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
    console.error('Error creating image item container:', error);
    return { error: 'An error occurred while creating the image item container.' };
  }
};

/**
 * Tool configuration for creating an image item container in Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_image_item_container',
      description: 'Create an image item container in Threads API.',
      parameters: {
        type: 'object',
        properties: {
          image_url: {
            type: 'string',
            description: 'The URL of the image to be uploaded.'
          },
          alt_text: {
            type: 'string',
            description: 'The accessibility label or alt text for the image.'
          }
        },
        required: ['image_url']
      }
    }
  }
};

export { apiTool };