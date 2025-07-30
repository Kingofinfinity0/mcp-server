/**
 * Function to delete a Threads post.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.thread_id - The ID of the thread to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ thread_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the delete request
    const url = `${apiHost}/${thread_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting the thread post:', error);
    return { error: 'An error occurred while deleting the thread post.' };
  }
};

/**
 * Tool configuration for deleting a Threads post.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_threads_post',
      description: 'Delete a Threads post by its ID.',
      parameters: {
        type: 'object',
        properties: {
          thread_id: {
            type: 'string',
            description: 'The ID of the thread to be deleted.'
          }
        },
        required: ['thread_id']
      }
    }
  }
};

export { apiTool };