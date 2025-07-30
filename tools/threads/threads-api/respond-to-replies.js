/**
 * Function to respond to replies on Threads.
 *
 * @param {Object} args - Arguments for the reply.
 * @param {string} args.text - The text associated with the reply.
 * @param {string} args.reply_to_id - The ID of the reply to respond to.
 * @returns {Promise<Object>} - The result of the reply action.
 */
const executeFunction = async ({ text, reply_to_id }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('media_type', 'TEXT');
    url.searchParams.append('text', text);
    url.searchParams.append('reply_to_id', reply_to_id);

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
    console.error('Error responding to replies:', error);
    return { error: 'An error occurred while responding to replies.' };
  }
};

/**
 * Tool configuration for responding to replies on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'respond_to_replies',
      description: 'Respond to a specific reply under the root post.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the reply.'
          },
          reply_to_id: {
            type: 'string',
            description: 'Required if replying to a specific post.'
          }
        },
        required: ['text', 'reply_to_id']
      }
    }
  }
};

export { apiTool };