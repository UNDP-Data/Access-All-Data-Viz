import axios from 'axios';

export const CheckIfLoginOrNot = async () => {
  try {
    const response = await axios.get(
      'https://data.undp.org/jsonapi/user/login_status',
    );
    return response.data.logged_in;
  } catch (error) {
    return false;
  }
};
