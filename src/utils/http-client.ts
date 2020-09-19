import Axios, {AxiosResponse} from 'axios';
import {ACCESSKEY, API_URL, DEFAULT_PAGESIZE} from '../constants';
import {UnsplashImage} from '../models/UnsplashImage';
import {fakeImage} from './fake-image';

/* Since I'm a poor man, unsplash API limit me at 50 requests/h
   so set this flag to true if you reached the limit 😋
*/
const POOR_MAN_MODE = true;

export const getImageList = (
  page: number,
  pageSize = DEFAULT_PAGESIZE
): Promise<AxiosResponse<UnsplashImage[]>> => {
  if (POOR_MAN_MODE) {
    return new Promise((resolve, reject) => {
      const fakeImages: UnsplashImage[] = new Array(pageSize).fill(fakeImage);

      resolve({data: fakeImages} as AxiosResponse<UnsplashImage[]>);
    });
  } else {
    return Axios.get(`${API_URL}/photos?client_id=${ACCESSKEY}&page=${page}&per_page=${pageSize}`);
  }
};
