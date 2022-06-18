import axios from 'axios';
import { atom } from 'recoil';
import { useEffect } from 'react';
import useGenericRecoilState from '../hooks/useGenericRecoilState';
import { FirstFactorRequestArgs } from '../types/first-factor.types';

const appStore = atom({
  key: 'app',
  default: {
    isFirstFactorSuccessful: false,
  },
});

export const useAppStore = () => {
  const [state, setState] = useGenericRecoilState(appStore);

  useEffect(() => {
    // DANGER!
    // Stores can't have effects!
    //   since stores might be used at multiple place,
    //   that could trigger duplicate effects
  }, []);

  const postFirstFactor = async (body: FirstFactorRequestArgs) => {
    try {
      axios.post('/api/first-factor', body).then(response => {
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
