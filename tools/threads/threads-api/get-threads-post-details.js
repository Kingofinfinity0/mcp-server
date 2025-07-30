/**
 * Function to get details of a Threads post.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.thread_id - The ID of the Threads media object to retrieve.
 * @param {string} [args.fields] - A comma-separated list of fields for a media object on Threads.
 * @returns {Promise<Object>} - The details of the Threads post.
 */
const executeFunction = async ({ thread_id, fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/${thread_id}`);
    url.searchParams.append('fields', fields || 'id,media_product_type,media_type,media_url');

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
    console.error('Error retrieving Threads post details:', error);
    return { error: 'An error occurred while retrieving Threads post details.' };
  }
};

/**
 * Tool configuration for getting Threads post details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_threads_post_details',
      description: 'Retrieve details of a Threads post by its ID.',
      parameters: {
        type: 'object',
        properties: {
          thread_id: {
            type: 'string',
            description: 'The ID of the Threads media object to retrieve.'
          },
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for a media object on Threads.'
          }
        },
        required: ['thread_id']
      }
    }
  }
};

export { apiTool };