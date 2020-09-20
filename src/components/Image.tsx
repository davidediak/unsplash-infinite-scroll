import React, {useState} from 'react';
import styled from 'styled-components';
import {UnsplashImage} from '../models/UnsplashImage';
import ImageDetail from './ImageDetail';

const StyImg = styled.img`
  cursor: pointer;
  width: 250px;
  height: 250px;
  object-fit: cover;
  max-height: 100%;
  max-width: 100%;
  margin: 5px;
`;

export default function Image({
  url,
  id,
  unsplashImage,
}: {
  url: string;
  id: string;
  unsplashImage: UnsplashImage;
}) {
  const [openPopup, setOpenPopup] = useState(false);

  const handleClick = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <ImageDetail
        openPopup={openPopup}
        closePopup={handleClose}
        unsplashImage={unsplashImage}></ImageDetail>
      <StyImg id={id} key={id} src={url} onClick={handleClick} />
    </>
  );
}
