/**
 * Function to retrieve user information from the Gumroad API.
 *
 * @returns {Promise<Object>} - The user information retrieved from the Gumroad API.
 */
const executeFunction = async () => {
  const url = 'https://api.gumroad.com/v2/user';
  const accessToken = ''; // will be provided by the user

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
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
    console.error('Error retrieving user information:', error);
    return { error: 'An error occurred while retrieving user information.' };
  }
};

/**
 * Tool configuration for retrieving user information from the Gumroad API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user_information',
      description: 'Retrieve information about the authenticated user from Gumroad.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };