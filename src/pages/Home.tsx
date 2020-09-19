import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import Image from '../components/Image';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import {getImageList} from '../utils/http-client';
import {UnsplashImage} from '../models/UnsplashImage';

const StyImagesContainer = styled.div`
  margin: 10vh 12.5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const StyLoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export default function Home() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [images, setImage] = useState<UnsplashImage[]>([]);

  const getData = () => {
    getImageList(page).then(res => {
      setImage([...images, ...res.data]);
      setPage(page => page + 1);
      if (firstLoad) setFirstLoad(false);
    });
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => {
    getData();
  }, []);

  if (firstLoad)
    return (
      <StyLoadingContainer>
        <CircularProgress />
      </StyLoadingContainer>
    );

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={getData}
        hasMore={true}
        loader={<LinearProgress />}>
        <StyImagesContainer>
          {images.map(image => (
            <Image url={image.urls.thumb} key={genereateKey()} id={genereateKey()} />
          ))}
        </StyImagesContainer>
      </InfiniteScroll>
    </div>
  );
}
