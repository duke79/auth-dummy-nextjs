import axios from 'axios';
import { atom } from 'recoil';
import { useEffect } from 'react';
import useGenericRecoilState from '../hooks/useGenericRecoilState';
import {
  RequestArgs as FirstFactorRequestArgs,
  ResponseData as FirstFactorResponseData
} from '../types/first-factor.types';

const authStore = atom({
  key: 'auth',
  default: {
    isFirstFactorSuccessful: false,
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
        setState({ isFirstFactorSuccessful: true });
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return {
    ...state,
    postFirstFactor,
  };
};
