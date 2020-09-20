import React, {Dispatch, Fragment, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import ImageScroll from '../components/ImageScroll';
import Navbar from '../components/Navbar';
import {SEARCH_SUBMIT, UiActionTypes} from '../redux/types';

export default function Home(props) {
  const dispatch: Dispatch<UiActionTypes> = useDispatch();
  const queryFromRoute: string = props?.match?.params?.queries;
  const [readyToStart, setReadyToStart] = useState(false);

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
    setReadyToStart(true);
    // eslint-disable-next-line
  }, [queryFromRoute]);

  const handleSubmit = (query: string[]) => {
    if (query?.length > 0) addToRoute(query);
    else removeFromRoute();
    dispatch({type: SEARCH_SUBMIT, payload: {query}});
    setReadyToStart(true);
  };

  return (
    <Fragment>
      <Navbar onSubmit={handleSubmit} />
      <ImageScroll readyToStart={readyToStart} />
    </Fragment>
  );
}
