/**
 * Function to create a media container in Threads.
 *
 * @param {Object} args - Arguments for creating a media container.
 * @param {string} args.text - The text associated with the post.
 * @param {string} args.media_type - Indicates the current media type (e.g., TEXT, IMAGE, VIDEO).
 * @param {string} args.quote_post_id - The ID of the Threads post that is being quoted.
 * @returns {Promise<Object>} - The result of the media container creation.
 */
const executeFunction = async ({ text, media_type, quote_post_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('text', text);
    url.searchParams.append('media_type', media_type);
    url.searchParams.append('quote_post_id', quote_post_id);

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
    console.error('Error creating media container:', error);
    return { error: 'An error occurred while creating the media container.' };
  }
};

/**
 * Tool configuration for creating a media container in Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_media_container',
      description: 'Create a media container in Threads.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          media_type: {
            type: 'string',
            enum: ['TEXT', 'IMAGE', 'VIDEO', 'CAROUSEL'],
            description: 'Indicates the current media type.'
          },
          quote_post_id: {
            type: 'string',
            description: 'The ID of the Threads post that is being quoted.'
          }
        },
        required: ['text', 'media_type']
      }
    }
  }
};

export { apiTool };