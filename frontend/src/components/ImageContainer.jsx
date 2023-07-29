import React from 'react';
import { string, number } from 'prop-types';
import { Container } from '@mui/material';

export const ImageContainer = ({ imgUrl, height, width }) => (
  <Container sx={{width: '25%'}}>
    <img src={imgUrl} height={`${height}px`} width={`${width}px`}/>
  </Container>
);

ImageContainer.propTypes = {
  imgUrl: string.isRequired,
  height: number,
};
