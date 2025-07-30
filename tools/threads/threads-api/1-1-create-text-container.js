/**
 * Function to create a text container on Threads.
 *
 * @param {Object} args - Arguments for creating a text container.
 * @param {string} args.text - The text associated with the post.
 * @param {string} [args.media_type="TEXT"] - The media type for the post.
 * @param {boolean} [args.auto_publish_text=true] - Flag to auto-publish the text post.
 * @returns {Promise<Object>} - The result of the text container creation.
 */
const executeFunction = async ({ text, media_type = 'TEXT', auto_publish_text = true }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('text', text);
    url.searchParams.append('media_type', media_type);
    url.searchParams.append('auto_publish_text', auto_publish_text.toString());

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
    console.error('Error creating text container:', error);
    return { error: 'An error occurred while creating the text container.' };
  }
};

/**
 * Tool configuration for creating a text container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_text_container',
      description: 'Create a text container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          media_type: {
            type: 'string',
            enum: ['TEXT'],
            description: 'The media type for the post.'
          },
          auto_publish_text: {
            type: 'boolean',
            description: 'Flag to auto-publish the text post.'
          }
        },
        required: ['text']
      }
    }
  }
};

export { apiTool };