import axios from 'axios';
import { useEffect } from 'react';
import { atom } from 'recoil';
import useGenericRecoilState from '../hooks/useGenericRecoilState';
import {
  RequestArgs as FirstFactorRequestArgs,
  ResponseData as FirstFactorResponseData
} from '../types/first-factor.types';
import {
  RequestArgs as SecondFactorRequestArgs
} from '../types/second-factor.types';

const authStore = atom({
  key: 'auth',
  default: {
    isTwoFactorEnabled: false,
    isFirstFactorSuccessful: false,
    isSecondFactorSuccessful: false,
  },
});

export const useAuthStore = () => {
  const [state, setState] = useGenericRecoilState(authStore);

  useEffect(() => {
    // DANGER!
    // Stores can't have effects!
    //   since stores might be used at multiple place,
    //   that could trigger duplicate effects
  }, []);

  const postFirstFactor = async (body: FirstFactorRequestArgs) => {
    try {
      axios.post('/api/first-factor', body).then((response) => {
        const data = response.data as FirstFactorResponseData;
        setState({
          isFirstFactorSuccessful: true,
          isTwoFactorEnabled: data.isTwoFactorEnabled,
        });
      });
    } catch (error) {
      console.error({ error });
    }
  };

  const postSecondFactor = async (body: SecondFactorRequestArgs) => {
    try {
      axios.post('/api/second-factor', body).then((response) => {
        setState({ isSecondFactorSuccessful: true });
      });
    } catch (error) {
      console.error({ error });
    }
  };

  const postLogout = async () => {
    try {
      axios.post('/api/logout', {}).then((response) => {
        setState({ isFirstFactorSuccessful: false });
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return {
    ...state,
    postFirstFactor,
    postSecondFactor,
    postLogout,
  };
};
