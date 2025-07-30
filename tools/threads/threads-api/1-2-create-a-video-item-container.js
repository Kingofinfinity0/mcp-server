/**
 * Function to create a video item container on Threads.
 *
 * @param {Object} args - Arguments for creating a video item container.
 * @param {string} args.video_url - The URL of the video to be uploaded.
 * @param {string} [args.alt_text="An example video."] - The accessibility label or alt text for the video.
 * @returns {Promise<Object>} - The result of the video item container creation.
 */
const executeFunction = async ({ video_url, alt_text = "An example video." }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('media_type', 'VIDEO');
    url.searchParams.append('video_url', video_url);
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
    console.error('Error creating video item container:', error);
    return { error: 'An error occurred while creating the video item container.' };
  }
};

/**
 * Tool configuration for creating a video item container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_video_item_container',
      description: 'Create a video item container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          video_url: {
            type: 'string',
            description: 'The URL of the video to be uploaded.'
          },
          alt_text: {
            type: 'string',
            description: 'The accessibility label or alt text for the video.'
          }
        },
        required: ['video_url']
      }
    }
  }
};

export { apiTool };