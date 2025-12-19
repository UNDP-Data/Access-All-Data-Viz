/* eslint-disable no-console */
import axios from 'axios';

export const CheckIfLoginOrNot = async () => {
  try {
    const response = await axios.get(
      'https://data.undp.org/jsonapi/user/login_status',
    );
    console.log('Login status response:', response.data);
    return response.data.logged_in;
  } catch (error) {
    console.log('Error checking login status:', error);
    return false;
  }
};
