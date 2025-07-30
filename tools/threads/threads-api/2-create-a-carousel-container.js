/**
 * Function to create a carousel container on Threads.
 *
 * @param {Object} args - Arguments for creating a carousel container.
 * @param {string} args.carousel_children_ids - A comma-separated list of container IDs of each image and/or video for the carousel.
 * @param {string} [args.text="This is a carousel."] - The text associated with the post.
 * @param {string} [args.reply_control="everyone"] - Specifies who can reply to a post.
 * @param {string} [args.topic_tag="ThreadsAPI"] - The topic to add to a post.
 * @param {string} [args.location_id] - The ID of the location being tagged.
 * @returns {Promise<Object>} - The result of the carousel container creation.
 */
const executeFunction = async ({ carousel_children_ids, text = "This is a carousel.", reply_control = "everyone", topic_tag = "ThreadsAPI", location_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('media_type', 'CAROUSEL');
    url.searchParams.append('children', carousel_children_ids);
    url.searchParams.append('text', text);
    if (reply_control) url.searchParams.append('reply_control', reply_control);
    if (topic_tag) url.searchParams.append('topic_tag', topic_tag);
    if (location_id) url.searchParams.append('location_id', location_id);

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
    console.error('Error creating carousel container:', error);
    return { error: 'An error occurred while creating the carousel container.' };
  }
};

/**
 * Tool configuration for creating a carousel container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_carousel_container',
      description: 'Create a carousel container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          carousel_children_ids: {
            type: 'string',
            description: 'A comma-separated list of container IDs of each image and/or video for the carousel.'
          },
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          reply_control: {
            type: 'string',
            description: 'Specifies who can reply to a post.'
          },
          topic_tag: {
            type: 'string',
            description: 'The topic to add to a post.'
          },
          location_id: {
            type: 'string',
            description: 'The ID of the location being tagged.'
          }
        },
        required: ['carousel_children_ids']
      }
    }
  }
};

export { apiTool };