import React, {Fragment} from 'react';
import ImageScroll from '../components/ImageScroll';
import Navbar from '../components/Navbar';

export default function Home() {
  // TODO shadowbox on images

  return (
    <Fragment>
      <Navbar />
      <ImageScroll />
    </Fragment>
  );
}
