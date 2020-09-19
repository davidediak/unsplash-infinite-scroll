import {CircularProgress, LinearProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Image from '../components/Image';
import {UnsplashImage} from '../models/UnsplashImage';
import {ReducersStates} from '../redux/types';
import {getData} from '../utils/http-client';

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

export default function ImageScroll() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [images, setImage] = useState<UnsplashImage[]>([]);
  const query = useSelector<ReducersStates, string>(state => state.UI.mainUI.query);

  const fetchData = () => {
    console.log('fetch', page);
    getData({query, page}).then(res => {
      setImage(prevImages => [...prevImages, ...res.data]);
      if (firstLoad) setFirstLoad(false);
    });
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => {
    setPage(1);
    setImage([]);
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    setPage(page => page + 1);
  };

  if (firstLoad)
    return (
      <StyLoadingContainer>
        <CircularProgress />
      </StyLoadingContainer>
    );

  if (!firstLoad && images?.length === 0) return <div>No results</div>;

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={handleScroll}
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
