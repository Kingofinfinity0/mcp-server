/**
 * Function to publish a Threads post.
 *
 * @param {Object} args - Arguments for publishing a Threads post.
 * @param {string} args.container_id - The identifier of the Threads media container to publish.
 * @returns {Promise<Object>} - The result of the publish operation.
 */
const executeFunction = async ({ container_id }) => {
  const apiHost = 'https://graph.threads.net';
  const token = process.env.THREADS_API_KEY;
  try {
    // Construct the URL for the publish request
    const url = new URL(`${apiHost}/me/threads_publish`);
    url.searchParams.append('creation_id', container_id);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
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
    console.error('Error publishing Threads post:', error);
    return { error: 'An error occurred while publishing the Threads post.' };
  }
};

/**
 * Tool configuration for publishing a Threads post.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'publish_threads_post',
      description: 'Publish a Threads post using the specified media container.',
      parameters: {
        type: 'object',
        properties: {
          container_id: {
            type: 'string',
            description: 'The identifier of the Threads media container to publish.'
          }
        },
        required: ['container_id']
      }
    }
  }
};

export { apiTool };