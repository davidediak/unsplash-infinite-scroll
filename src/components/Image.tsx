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

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
    0 32px 64px rgba(0, 0, 0, 0.07);
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
