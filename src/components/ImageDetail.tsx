import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {CircularProgress, IconButton, Typography} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import {UnsplashImage} from '../models/UnsplashImage';
import styled from 'styled-components';
import dayjs from 'dayjs';
import {StyLoadingContainer} from './styled-components';

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyImg = styled.img`
  width: auto;
  height: 500px;
  object-fit: cover;
  max-height: 100%;
  max-width: 100%;
  margin: 5px;
  @media (max-width: 900px) {
    height: 250px;
  }
`;

const StyMuiDialogTitle = styled(MuiDialogTitle)`
  && {
    & > h2 {
      display: flex;
      align-items: center;
      width: 100%;
      & > button {
        margin-left: auto;
      }
    }
  }
`;

const StyTypography = styled(Typography)`
  && {
    & > label {
      font-weight: bold;
    }
  }
`;

const StyDialog = styled(Dialog)`
  && {
    & > .MuiDialog-container > .MuiDialog-paper {
      min-width: 600px;
      @media (max-width: 900px) {
        min-width: 300px;
      }
    }
  }
`;

export default function ImageDetail({
  openPopup,
  closePopup,
  unsplashImage,
}: {
  openPopup: boolean;
  closePopup: () => void;
  unsplashImage: UnsplashImage;
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const handleClose = () => {
    closePopup();
  };

  const imageLoaded = () => {
    setImageLoading(false);
  };

  return (
    <div>
      <StyDialog onClose={handleClose} open={openPopup}>
        <StyMuiDialogTitle>
          <StyTypography>
            <label>{unsplashImage?.id}</label>
          </StyTypography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </StyMuiDialogTitle>
        <MuiDialogContent>
          <ImgContainer>
            {imageLoading && (
              <StyLoadingContainer>
                <CircularProgress />
              </StyLoadingContainer>
            )}
            <StyImg
              src={unsplashImage?.urls?.full}
              onLoad={imageLoaded}
              style={{visibility: imageLoading ? 'hidden' : 'visible'}}
            />
          </ImgContainer>
          <StyTypography>
            <label>User:</label> {unsplashImage?.user?.name}
          </StyTypography>
          <StyTypography>
            <label>Likes:</label> {unsplashImage?.likes}
          </StyTypography>
          <StyTypography>
            <label>Date:</label> {dayjs(unsplashImage?.created_at).format('MMM D, YYYY')}
          </StyTypography>
        </MuiDialogContent>
      </StyDialog>
    </div>
  );
}
