import Axios, {AxiosResponse} from 'axios';
import {ACCESSKEY, API_URL, DEFAULT_PAGESIZE} from '../constants';
import {UnsplashImage} from '../models/UnsplashImage';
import {fakeImage} from './fake-image';

/* Since I'm a poor man, unsplash API limit me at 50 requests/h
   so set this flag to true if you reached the limit 😋
*/
const POOR_MAN_MODE = true;

const fakeData: Promise<AxiosResponse<UnsplashImage[]>> = new Promise((resolve, reject) => {
  const fakeImages: UnsplashImage[] = new Array(DEFAULT_PAGESIZE).fill(fakeImage);

  resolve({data: fakeImages} as AxiosResponse<UnsplashImage[]>);
});

export const getData = ({
  query,
  page,
}: {
  query?: string;
  page: number;
}): Promise<AxiosResponse<UnsplashImage[]>> => {
  if (query) return getImageListWithSearch(query, page);
  else return getImageList(page);
};

export const getImageList = (page: number): Promise<AxiosResponse<UnsplashImage[]>> => {
  if (POOR_MAN_MODE) {
    return fakeData;
  } else {
    return Axios.get(
      `${API_URL}/photos?client_id=${ACCESSKEY}&page=${page}&per_page=${DEFAULT_PAGESIZE}`
    );
  }
};

export const getImageListWithSearch = (
  query: string,
  page: number
): Promise<AxiosResponse<UnsplashImage[]>> => {
  return Axios.get(
    `${API_URL}/search/photos?client_id=${ACCESSKEY}&query=${query}&page=${page}&per_page=${DEFAULT_PAGESIZE}`
  ).then(res => {
    res.data = [...res.data.results];
    return res;
  });
};
