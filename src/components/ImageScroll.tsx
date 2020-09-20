import {CircularProgress, LinearProgress} from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import Image from '../components/Image';
import {UnsplashImage} from '../models/UnsplashImage';
import {ReducersStates} from '../redux/types';
import {getData} from '../utils/http-client';
import {StyLoadingContainer} from './styled-components';

const StyImagesContainer = styled.div`
  margin: 10vh 12.5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const StyNoResults = styled(StyLoadingContainer)`
  && {
    font-size: 4rem;
  }
`;
export default function ImageScroll({readyToStart}: {readyToStart: boolean}) {
  const loading = useRef(true);
  const totalImages = useRef(0);
  const [page, setPage] = useState(1);
  const [images, setImage] = useState<UnsplashImage[]>([]);
  const query = useSelector<ReducersStates, string[]>(state => state.UI.mainUI.query);

  const fetchData = () => {
    console.log(`fetch (page ${page} query ${query})`);
    getData({query, page}).then(res => {
      totalImages.current = res.data.total;
      loading.current = false;
      setImage(prevImages => [...prevImages, ...res.data.results]);
    });
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => {
    if (readyToStart) {
      setPage(1);
      setImage([]);
      loading.current = true;
      fetchData();
    }
    // eslint-disable-next-line
  }, [JSON.stringify(query), readyToStart]);

  useEffect(() => {
    if (page > 1) fetchData();
    // eslint-disable-next-line
  }, [page]);

  const handleScroll = () => {
    setPage(page => page + 1);
  };

  if (loading.current)
    return (
      <StyLoadingContainer>
        <CircularProgress />
      </StyLoadingContainer>
    );

  if (!loading.current && images?.length === 0)
    return (
      <StyImagesContainer>
        <StyNoResults>No results</StyNoResults>
      </StyImagesContainer>
    );

  return (
    <div>
      <InfiniteScroll
        dataLength={images.length}
        next={handleScroll}
        hasMore={images.length < totalImages.current}
        style={{overflow: 'hidden'}}
        loader={<LinearProgress />}>
        <StyImagesContainer>
          {images.map(image => (
            <Image
              url={image.urls.thumb}
              key={genereateKey()}
              id={genereateKey()}
              unsplashImage={image}
            />
          ))}
        </StyImagesContainer>
      </InfiniteScroll>
    </div>
  );
}
