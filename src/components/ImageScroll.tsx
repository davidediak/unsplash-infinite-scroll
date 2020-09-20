import {CircularProgress, LinearProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
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
export default function ImageScroll({haveQueryFromRoute}: {haveQueryFromRoute: boolean}) {
  const [firstNormalLoad, setFirstNormalLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [images, setImage] = useState<UnsplashImage[]>([]);
  const [totalImages, setTotalImages] = useState(0);
  const query = useSelector<ReducersStates, string[]>(state => state.UI.mainUI.query);

  const fetchData = () => {
    console.log(`fetch (page ${page} query ${query})`);
    getData({query, page}).then(res => {
      setImage(prevImages => [...prevImages, ...res.data.results]);
      setTotalImages(res.data.total);
      if (loading) setLoading(false);
      if (firstNormalLoad) setFirstNormalLoad(false);
    });
  };

  const genereateKey = () => Math.random().toString();

  useEffect(() => {
    setPage(0);
    setImage([]);
    setLoading(true);
    setFirstNormalLoad(false);
  }, [query]);

  useEffect(() => {
    if (haveQueryFromRoute) setFirstNormalLoad(false);
  }, [haveQueryFromRoute]);

  useEffect(() => {
    const isFirstNormalLoading = firstNormalLoad && !haveQueryFromRoute;
    const isLoadingWithQueryInRoute = !firstNormalLoad && haveQueryFromRoute;
    const isNormalSearch = !firstNormalLoad && !haveQueryFromRoute;
    if (page === 0) {
      if (isFirstNormalLoading || isLoadingWithQueryInRoute || isNormalSearch) setPage(1);
    } else fetchData();
    // eslint-disable-next-line
  }, [firstNormalLoad, page]);

  const handleScroll = () => {
    setPage(page => page + 1);
  };

  if (loading)
    return (
      <StyLoadingContainer>
        <CircularProgress />
      </StyLoadingContainer>
    );

  if (!loading && images?.length === 0)
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
        hasMore={images.length < totalImages}
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
