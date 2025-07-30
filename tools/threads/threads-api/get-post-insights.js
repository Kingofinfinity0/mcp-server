/**
 * Function to get insights for a specific Threads post.
 *
 * @param {Object} args - Arguments for the insights request.
 * @param {string} args.thread_id - The ID of the Threads post for which to retrieve insights.
 * @param {string} [args.metrics_post] - A comma-separated list of metrics for a post on Threads.
 * @returns {Promise<Object>} - The insights data for the specified Threads post.
 */
const executeFunction = async ({ thread_id, metrics_post }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the insights request
    const url = new URL(`${apiHost}/${thread_id}/insights`);
    url.searchParams.append('metric', metrics_post);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`
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
    console.error('Error getting post insights:', error);
    return { error: 'An error occurred while retrieving post insights.' };
  }
};

/**
 * Tool configuration for getting insights for a Threads post.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_post_insights',
      description: 'Retrieve insights for a specific Threads post.',
      parameters: {
        type: 'object',
        properties: {
          thread_id: {
            type: 'string',
            description: 'The ID of the Threads post for which to retrieve insights.'
          },
          metrics_post: {
            type: 'string',
            description: 'A comma-separated list of metrics for a post on Threads.'
          }
        },
        required: ['thread_id']
      }
    }
  }
};

export { apiTool };