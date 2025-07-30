/**
 * Function to search for Threads posts based on a keyword.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.q - The query to be searched for.
 * @param {string} [args.search_type="TOP"] - The type of search to be performed. Can be either TOP or RECENT.
 * @param {string} [args.fields] - A comma-separated list of fields for media objects on Threads.
 * @returns {Promise<Object>} - The result of the Threads posts search.
 */
const executeFunction = async ({ q, search_type = 'TOP', fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/keyword_search`);
    url.searchParams.append('q', q);
    url.searchParams.append('search_type', search_type);
    if (fields) {
      url.searchParams.append('fields', fields);
    }

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
    console.error('Error searching for Threads posts:', error);
    return { error: 'An error occurred while searching for Threads posts.' };
  }
};

/**
 * Tool configuration for searching Threads posts.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_threads_posts',
      description: 'Search for Threads posts based on a keyword.',
      parameters: {
        type: 'object',
        properties: {
          q: {
            type: 'string',
            description: 'The query to be searched for.'
          },
          search_type: {
            type: 'string',
            enum: ['TOP', 'RECENT'],
            description: 'The type of search to be performed.'
          },
          fields: {
            type: 'string',
            description: 'A comma-separated list of fields for media objects on Threads.'
          }
        },
        required: ['q']
      }
    }
  }
};

export { apiTool };