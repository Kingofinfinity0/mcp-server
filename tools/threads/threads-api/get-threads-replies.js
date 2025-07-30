/**
 * Function to get replies for a specific thread on Threads API.
 *
 * @param {Object} args - Arguments for fetching replies.
 * @param {string} args.thread_id - The ID of the thread for which to fetch replies.
 * @param {string} [args.fields] - A comma-separated list of fields for replies on Threads.
 * @param {boolean} [args.reverse=false] - Whether or not replies should be sorted in reverse chronological order.
 * @returns {Promise<Object>} - The result of the replies fetch operation.
 */
const executeFunction = async ({ thread_id, fields, reverse = false }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/${thread_id}/replies`);
    url.searchParams.append('fields', fields || ''); // use provided fields or default
    url.searchParams.append('reverse', reverse.toString());

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
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
    console.error('Error fetching replies:', error);
    return { error: 'An error occurred while fetching replies.' };
  }
};

/**
 * Tool configuration for getting replies from Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_threads_replies',
      description: 'Fetch replies for a specific thread on Threads API.',
      parameters: {
        type: 'object',
        properties: {
          thread_id: {
            type: 'string',
            description: 'The ID of the thread for which to fetch replies.'
          },
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for replies on Threads.'
          },
          reverse: {
            type: 'boolean',
            description: 'Whether or not replies should be sorted in reverse chronological order.'
          }
        },
        required: ['thread_id']
      }
    }
  }
};

export { apiTool };