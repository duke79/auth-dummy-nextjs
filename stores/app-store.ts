import axios from 'axios';
import { atom } from 'recoil';
import { useEffect } from 'react';
import useGenericRecoilState from '../hooks/useGenericRecoilState';
import {
  RequestArgs as MasterDataRequestArgs,
  ResponseData as MasterDataResponseData
} from '../types/master-data.types';

const initialState = {
  hasLoaded: false,
  username: '',
  phone: '',
  roles: [] as string[],
};

const appStore = atom({
  key: 'app',
  default: initialState,
});

export const useAppStore = () => {
  const [state, setState] = useGenericRecoilState(appStore);

  useEffect(() => {
    // DANGER!
    // Stores can't have effects!
    //   since stores might be used at multiple place,
    //   that could trigger duplicate effects
  }, []);

  const getMasterData = async (body: MasterDataRequestArgs) => {
    try {
      axios.post('/api/master-data', body).then((response: any) => {
        const { data } = response || {};
        setState({
          hasLoaded: false,
        });
        setState({
          username: data.username,
          phone: data.phone,
          roles: data.roles,
          hasLoaded: true,
        });
      }).catch((error) => {
        setState({
          hasLoaded: true,
        });
        console.error({ error });
      });
    } catch (error) {
      setState({
        hasLoaded: true,
      });
      console.error({ error });
    }
  };

  const resetMasterData = () => {
    setState(initialState);
  };

  return {
    ...state,
    isLoggedOut: state.hasLoaded && !state.username,
    isLoggedIn: state.hasLoaded && state.username,
    getMasterData,
    resetMasterData,
  };
};
