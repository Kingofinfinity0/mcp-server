/**
 * Function to check the publishing status of a container in the Threads API.
 *
 * @param {Object} args - Arguments for the status check.
 * @param {string} args.container_id - The ID of the container to check.
 * @returns {Promise<Object>} - The result of the container's publishing status check.
 */
const executeFunction = async ({ container_id }) => {
  const apiHost = 'https://graph.threads.net';
  const fieldsContainer = 'id,status,error_message'; // predefined fields for the request
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `${apiHost}/${container_id}/?fields=${fieldsContainer}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error checking container publishing status:', error);
    return { error: 'An error occurred while checking the container publishing status.' };
  }
};

/**
 * Tool configuration for checking the publishing status of a container in the Threads API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'check_container_publishing_status',
      description: 'Check the publishing status of a container in the Threads API.',
      parameters: {
        type: 'object',
        properties: {
          container_id: {
            type: 'string',
            description: 'The ID of the container to check.'
          }
        },
        required: ['container_id']
      }
    }
  }
};

export { apiTool };