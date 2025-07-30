/**
 * Function to publish a carousel container on Threads.
 *
 * @param {Object} args - Arguments for publishing the carousel.
 * @param {string} args.container_id - The carousel container ID.
 * @returns {Promise<Object>} - The result of the publish operation.
 */
const executeFunction = async ({ container_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${apiHost}/me/threads_publish?creation_id=${container_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error publishing carousel container:', error);
    return { error: 'An error occurred while publishing the carousel container.' };
  }
};

/**
 * Tool configuration for publishing a carousel container on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'publish_carousel_container',
      description: 'Publish a carousel container on Threads.',
      parameters: {
        type: 'object',
        properties: {
          container_id: {
            type: 'string',
            description: 'The carousel container ID.'
          }
        },
        required: ['container_id']
      }
    }
  }
};

export { apiTool };