import React, {Dispatch, Fragment, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ImageScroll from '../components/ImageScroll';
import Navbar from '../components/Navbar';
import {SEARCH_SUBMIT, UiActionTypes} from '../redux/types';

export default function Home(props) {
  // TODO shadowbox on images
  const dispatch: Dispatch<UiActionTypes> = useDispatch();
  const queryFromRoute: string = props?.match?.params?.queries;

  const addToRoute = (query: string[]) => {
    const queries = query.join(',');
    props.history.push(`/search=${queries}`);
  };

  const removeFromRoute = () => {
    props.history.push(`/`);
  };

  useEffect(() => {
    if (queryFromRoute?.length > 0) {
      const query = queryFromRoute.split(',').filter(t => t !== '');
      dispatch({type: SEARCH_SUBMIT, payload: {query}});
    }
  }, [queryFromRoute]);

  const handleSubmit = (query: string[]) => {
    if (query?.length > 0) addToRoute(query);
    else removeFromRoute();
    dispatch({type: SEARCH_SUBMIT, payload: {query}});
  };

  return (
    <Fragment>
      <Navbar onSubmit={handleSubmit} queryFromRoute={queryFromRoute} />
      <ImageScroll haveQueryFromRoute={Boolean(queryFromRoute)} />
    </Fragment>
  );
}
