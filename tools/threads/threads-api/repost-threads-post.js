/**
 * Function to repost a Threads post.
 *
 * @param {Object} args - Arguments for reposting a Threads post.
 * @param {string} args.thread_id - The ID of the thread to repost.
 * @returns {Promise<Object>} - The result of the repost operation.
 */
const executeFunction = async ({ thread_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the repost request
    const url = `${apiHost}/${thread_id}/repost`;

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
    console.error('Error reposting Threads post:', error);
    return { error: 'An error occurred while reposting the Threads post.' };
  }
};

/**
 * Tool configuration for reposting a Threads post.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'repost_threads_post',
      description: 'Repost a Threads post.',
      parameters: {
        type: 'object',
        properties: {
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to repost.'
          }
        },
        required: ['thread_id']
      }
    }
  }
};

export { apiTool };