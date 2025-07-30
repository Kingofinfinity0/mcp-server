/**
 * Function to hide or unhide replies on Threads.
 *
 * @param {Object} args - Arguments for managing replies.
 * @param {string} args.reply_thread_id - The ID of the reply thread to manage.
 * @param {boolean} args.hide - Set to true to hide a reply and false to unhide a reply.
 * @returns {Promise<Object>} - The result of the hide/unhide reply operation.
 */
const executeFunction = async ({ reply_thread_id, hide }) => {
  const apiHost = 'https://graph.threads.net';
  const accessToken = ''; // will be provided by the user
  try {
    // Construct the URL for the request
    const url = `${apiHost}/${reply_thread_id}/manage_reply?hide=${hide}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error managing replies:', error);
    return { error: 'An error occurred while managing replies.' };
  }
};

/**
 * Tool configuration for managing replies on Threads.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'hide_replies',
      description: 'Hide or unhide replies on Threads.',
      parameters: {
        type: 'object',
        properties: {
          reply_thread_id: {
            type: 'string',
            description: 'The ID of the reply thread to manage.'
          },
          hide: {
            type: 'boolean',
            description: 'Set to true to hide a reply and false to unhide a reply.'
          }
        },
        required: ['reply_thread_id', 'hide']
      }
    }
  }
};

export { apiTool };