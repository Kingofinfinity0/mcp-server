/**
 * Function to retrieve location details from the Threads API.
 *
 * @param {Object} args - Arguments for the location retrieval.
 * @param {string} args.location_id - The ID of the location to retrieve.
 * @param {string} [args.fields] - Comma-separated list of fields to return for the location.
 * @returns {Promise<Object>} - The result of the location retrieval.
 */
const executeFunction = async ({ location_id, fields }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with the location ID and fields
    const url = new URL(`${apiHost}/${location_id}`);
    url.searchParams.append('fields', fields);

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
    console.error('Error retrieving location:', error);
    return { error: 'An error occurred while retrieving the location.' };
  }
};

/**
 * Tool configuration for retrieving location details from the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_threads_location',
      description: 'Retrieve details of a specific location from the Threads API.',
      parameters: {
        type: 'object',
        properties: {
          location_id: {
            type: 'string',
            description: 'The ID of the location to retrieve.'
          },
          fields: {
            type: 'string',
            description: 'Comma-separated list of fields to return for the location.'
          }
        },
        required: ['location_id']
      }
    }
  }
};

export { apiTool };