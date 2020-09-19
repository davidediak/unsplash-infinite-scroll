import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import Image from '../components/Image';
import {LinearProgress} from '@material-ui/core';

const ImageCell = styled.div`
  margin: 10vh 12.5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export default function Home() {
  const API_URL = 'https://api.unsplash.com';
  const ACCESSKEY = process.env.REACT_APP_UNSPLASH_ACCESSKEY;
  const DEFAULT_COUNT = 15;
  const [images, setImage] = useState([]); // TODO type unsplash image

  const getData = (count = DEFAULT_COUNT) => {
    axios.get(`${API_URL}/photos/random?client_id=${ACCESSKEY}&count=${count}`).then(res => {
      setImage([...images, ...res.data]);
    });
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={getData}
        hasMore={true}
        loader={<LinearProgress />}>
        <ImageCell>
          {images.map(image => (
            <Image url={image.urls.thumb} key={genereateKey()} id={genereateKey()} />
          ))}
        </ImageCell>
      </InfiniteScroll>
    </div>
  );
}
