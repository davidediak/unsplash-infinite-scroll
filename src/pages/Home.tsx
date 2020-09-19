import React, {useState, useEffect, Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import Image from '../components/Image';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import {getData} from '../utils/http-client';
import {UnsplashImage} from '../models/UnsplashImage';
import Navbar from '../components/Navbar';

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
  const [query, setQuery] = useState('');
  const [images, setImage] = useState<UnsplashImage[]>([]);

  const fetchData = () => {
    getData({query, page}).then(res => {
      setImage([...images, ...res.data]);
      setPage(page => page + 1);
      if (firstLoad) setFirstLoad(false);
    });
  };

  // TODO handle no results

  const handleSearchType = (search: string) => {
    setPage(1);
    setImage([]);
    setQuery(search);
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => fetchData(), []);

  if (firstLoad)
    return (
      <StyLoadingContainer>
        <CircularProgress />
      </StyLoadingContainer>
    );

  return (
    <Fragment>
      <Navbar searchCallback={handleSearchType} />
      <div>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchData}
          hasMore={true}
          loader={<LinearProgress />}>
          <StyImagesContainer>
            {images.map(image => (
              <Image url={image.urls.thumb} key={genereateKey()} id={genereateKey()} />
            ))}
          </StyImagesContainer>
        </InfiniteScroll>
      </div>
    </Fragment>
  );
}
