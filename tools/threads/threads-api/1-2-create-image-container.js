/**
 * Function to create an image container on Threads.
 *
 * @param {Object} args - Arguments for creating the image container.
 * @param {string} args.text - The text associated with the post (optional).
 * @param {string} args.image_url - The URL of the image to be posted.
 * @param {string} args.alt_text - The accessibility label or alt text for the image.
 * @param {string} [args.reply_control="everyone"] - Specifies who can reply to the post.
 * @param {string} [args.topic_tag="ThreadsAPI"] - The topic to add to the post.
 * @param {string} [args.location_id] - The ID of the location being tagged (optional).
 * @returns {Promise<Object>} - The result of the image container creation.
 */
const executeFunction = async ({ text = "This is an image.", image_url, alt_text = "An example image.", reply_control = "everyone", topic_tag = "ThreadsAPI", location_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('text', text);
    url.searchParams.append('media_type', 'IMAGE');
    url.searchParams.append('image_url', image_url);
    url.searchParams.append('alt_text', alt_text);
    if (location_id) {
      url.searchParams.append('location_id', location_id);
    }
    if (topic_tag) {
      url.searchParams.append('topic_tag', topic_tag);
    }
    if (reply_control) {
      url.searchParams.append('reply_control', reply_control);
    }

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
    console.error('Error creating image container:', error);
    return { error: 'An error occurred while creating the image container.' };
  }
};

/**
 * Tool configuration for creating an image container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_image_container',
      description: 'Create an image container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          image_url: {
            type: 'string',
            description: 'The URL of the image to be posted.'
          },
          alt_text: {
            type: 'string',
            description: 'The accessibility label or alt text for the image.'
          },
          reply_control: {
            type: 'string',
            description: 'Specifies who can reply to the post.'
          },
          topic_tag: {
            type: 'string',
            description: 'The topic to add to the post.'
          },
          location_id: {
            type: 'string',
            description: 'The ID of the location being tagged.'
          }
        },
        required: ['image_url']
      }
    }
  }
};

export { apiTool };