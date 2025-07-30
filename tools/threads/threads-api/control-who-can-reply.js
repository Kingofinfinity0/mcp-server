/**
 * Function to control who can reply to a post on Threads.
 *
 * @param {Object} args - Arguments for controlling replies.
 * @param {string} args.text - The text associated with the post.
 * @param {string} args.reply_control - Specifies who can reply to the post.
 * @returns {Promise<Object>} - The result of the reply control request.
 */
const executeFunction = async ({ text, reply_control }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`${apiHost}/me/threads`);
    url.searchParams.append('media_type', 'TEXT');
    url.searchParams.append('text', text);
    url.searchParams.append('reply_control', reply_control);

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
    console.error('Error controlling who can reply:', error);
    return { error: 'An error occurred while controlling replies.' };
  }
};

/**
 * Tool configuration for controlling who can reply to a post on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'control_reply',
      description: 'Control who can reply to a post on Threads.',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text associated with the post.'
          },
          reply_control: {
            type: 'string',
            description: 'Specifies who can reply to the post.'
          }
        },
        required: ['text', 'reply_control']
      }
    }
  }
};

export { apiTool };