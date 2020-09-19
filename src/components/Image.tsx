import React from 'react';
import styled from 'styled-components';

const StyImg = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  max-height: 100%;
  max-width: 100%;
  margin: 5px;
`;

export default function Image({url, id}: {url: string; id: string}) {
  return (
    <>
      <StyImg id={id} key={id} src={url} />
    </>
  );
}
