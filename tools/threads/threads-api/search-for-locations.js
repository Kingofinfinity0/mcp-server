/**
 * Function to search for locations using the Threads API.
 *
 * @param {Object} args - Arguments for the location search.
 * @param {string} args.q - The query to search for locations.
 * @param {string} [args.fields] - A list of comma-separated fields for a location.
 * @returns {Promise<Object>} - The result of the location search.
 */
const executeFunction = async ({ q, fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/location_search`);
    url.searchParams.append('q', q);
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
    console.error('Error searching for locations:', error);
    return { error: 'An error occurred while searching for locations.' };
  }
};

/**
 * Tool configuration for searching locations using the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_locations',
      description: 'Search for locations using the Threads API.',
      parameters: {
        type: 'object',
        properties: {
          q: {
            type: 'string',
            description: 'The query to search for locations.'
          },
          fields: {
            type: 'string',
            description: 'A list of comma-separated fields for a location.'
          }
        },
        required: ['q']
      }
    }
  }
};

export { apiTool };