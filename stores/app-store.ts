import axios from 'axios';
import { atom } from 'recoil';
import { useEffect } from 'react';
import useGenericRecoilState from '../hooks/useGenericRecoilState';
import {
  RequestArgs as MasterDataRequestArgs,
  ResponseData as MasterDataResponseData
} from '../types/master-data.types';

const appStore = atom({
  key: 'app',
  default: {
    username: '',
    phone: '',
    roles: [] as string[],
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

  const getMasterData = async (body: MasterDataRequestArgs) => {
    try {
      axios.post('/api/master-data', body).then((response: any) => {
        const { data } = response || {};
        setState({
          username: data.username,
          phone: data.phone,
          roles: data.roles,
        });
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return {
    ...state,
    getMasterData,
  };
};
