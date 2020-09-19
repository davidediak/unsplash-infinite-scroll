import React, {Fragment} from 'react';
import ImageScroll from '../components/ImageScroll';
import Navbar from '../components/Navbar';

export default function Home({match}) {
  // TODO shadowbox on images
  const queries: string = match?.params?.queries;
  return (
    <Fragment>
      <Navbar queryFromRoute={queries} />
      <ImageScroll haveQueryFromRoute={Boolean(queries)} />
    </Fragment>
  );
}
