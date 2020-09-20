import Axios, {AxiosResponse} from 'axios';
import {ACCESSKEY, API_URL, DEFAULT_PAGESIZE} from '../constants';
import {UnsplashImage} from '../models/UnsplashImage';
import {fakeImage} from './fake-image';

/* Since I'm a poor man, unsplash API limit me at 50 requests/h
   so set this flag to true if you reached the limit 😋
*/
const POOR_MAN_MODE = false;

const fakeData: Promise<AxiosResponse<{results: UnsplashImage[]; total: number}>> = new Promise(
  (resolve, reject) => {
    const fakeImages: UnsplashImage[] = new Array(DEFAULT_PAGESIZE).fill(fakeImage);

    resolve({data: {results: fakeImages, total: Infinity}} as AxiosResponse<{
      results: UnsplashImage[];
      total: number;
    }>);
  }
);

export const getData = ({
  query,
  page,
}: {
  query?: string[];
  page: number;
}): Promise<AxiosResponse<{results: UnsplashImage[]; total: number}>> => {
  if (query?.length > 0) return getImageListWithSearch(query, page);
  else return getImageList(page);
};

export const getImageList = (
  page: number
): Promise<AxiosResponse<{results: UnsplashImage[]; total: number}>> => {
  if (POOR_MAN_MODE) {
    return fakeData;
  } else {
    return Axios.get(
      `${API_URL}/photos?client_id=${ACCESSKEY}&page=${page}&per_page=${DEFAULT_PAGESIZE}`
    ).then(res => {
      res.data.results = [...res.data];
      res.data.total = Infinity;
      return res;
    });
  }
};

export const getImageListWithSearch = (
  query: string[],
  page: number
): Promise<AxiosResponse<{results: UnsplashImage[]; total: number}>> => {
  const queries = query.join(',');
  return Axios.get(
    `${API_URL}/search/photos?client_id=${ACCESSKEY}&query=${queries}&page=${page}&per_page=${DEFAULT_PAGESIZE}`
  );
};
