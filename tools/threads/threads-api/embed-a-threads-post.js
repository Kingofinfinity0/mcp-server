/**
 * Function to embed a Threads post.
 *
 * @param {Object} args - Arguments for the embed post request.
 * @param {string} args.url - The URL of the Threads post to be embedded.
 * @returns {Promise<Object>} - The result of the embed post request.
 */
const executeFunction = async ({ url }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the embed request
    const embedUrl = new URL(`${apiHost}/oembed`);
    embedUrl.searchParams.append('url', url);

    // If an access token is provided, add it to the query parameters
    if (accessToken) {
      embedUrl.searchParams.append('access_token', accessToken);
    }

    // Perform the fetch request
    const response = await fetch(embedUrl.toString(), {
      method: 'GET'
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
    console.error('Error embedding the Threads post:', error);
    return { error: 'An error occurred while embedding the Threads post.' };
  }
};

/**
 * Tool configuration for embedding a Threads post.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'embed_threads_post',
      description: 'Embed a Threads post using its URL.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of the Threads post to be embedded.'
          }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };