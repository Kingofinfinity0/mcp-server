/**
 * Function to create a video container on Threads.
 *
 * @param {Object} args - Arguments for creating the video container.
 * @param {string} args.text - The text associated with the post (optional).
 * @param {string} args.video_url - The URL of the video to be posted.
 * @param {string} args.alt_text - The accessibility label or alt text for the video.
 * @param {string} [args.reply_control="everyone"] - Specifies who can reply to the post.
 * @param {string} [args.topic_tag="ThreadsAPI"] - The topic to add to the post.
 * @param {string} [args.location_id] - The ID of the location being tagged (optional).
 * @returns {Promise<Object>} - The result of the video container creation.
 */
const executeFunction = async ({ text = "This is a video.", video_url, alt_text = "An example video.", reply_control = "everyone", topic_tag = "ThreadsAPI", location_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('text', text);
    url.searchParams.append('media_type', 'VIDEO');
    url.searchParams.append('video_url', video_url);
    url.searchParams.append('alt_text', alt_text);
    if (location_id) {
      url.searchParams.append('location_id', location_id);
    }
    if (reply_control) {
      url.searchParams.append('reply_control', reply_control);
    }
    if (topic_tag) {
      url.searchParams.append('topic_tag', topic_tag);
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
    console.error('Error creating video container:', error);
    return { error: 'An error occurred while creating the video container.' };
  }
};

/**
 * Tool configuration for creating a video container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_video_container',
      description: 'Create a video container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          video_url: {
            type: 'string',
            description: 'The URL of the video to be posted.'
          },
          alt_text: {
            type: 'string',
            description: 'The accessibility label or alt text for the video.'
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
        required: ['video_url']
      }
    }
  }
};

export { apiTool };