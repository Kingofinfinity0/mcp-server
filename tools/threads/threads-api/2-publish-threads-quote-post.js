/**
 * Function to publish a quote post on Threads.
 *
 * @param {Object} args - Arguments for publishing the quote post.
 * @param {string} args.container_id - The identifier of the Threads media container created from the /threads endpoint.
 * @returns {Promise<Object>} - The result of the publish request.
 */
const executeFunction = async ({ container_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = new URL(`${apiHost}/me/threads_publish`);
    url.searchParams.append('creation_id', container_id);

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
    console.error('Error publishing quote post:', error);
    return { error: 'An error occurred while publishing the quote post.' };
  }
};

/**
 * Tool configuration for publishing a quote post on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'publish_quote_post',
      description: 'Publish a quote post on Threads.',
      parameters: {
        type: 'object',
        properties: {
          container_id: {
            type: 'string',
            description: 'The identifier of the Threads media container created from the /threads endpoint.'
          }
        },
        required: ['container_id']
      }
    }
  }
};

export { apiTool };