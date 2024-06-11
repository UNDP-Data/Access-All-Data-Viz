import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

export const CheckIfLoginOrNot = async () => {
  const [loginState, setLoginState] = useState(false);
  await axios
    .get('https://data.undp.org/jsonapi/user/login_status')
    .then((response: AxiosResponse) => {
      setLoginState(response.data.logged_in);
    })
    .catch(_err => {
      setLoginState(false);
    });
  return loginState;
};
