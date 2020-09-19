import Axios, {AxiosResponse} from 'axios';
import {ACCESSKEY, API_URL, DEFAULT_COUNT} from '../constants';

export const getImageList = (count = DEFAULT_COUNT): Promise<AxiosResponse> => {
  return Axios.get(`${API_URL}/photos/random?client_id=${ACCESSKEY}&count=${count}`);
};
