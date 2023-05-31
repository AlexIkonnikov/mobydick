import React from 'react';

import Carousel from './Carousel';
import {ICarouselProps} from './types';

const AutoCarousel = <T,>({...otherProps}: ICarouselProps<T>): JSX.Element => {
  return (
    <Carousel
      showsHorizontalScrollIndicator={false}
      autoScroll={true}
      {...otherProps}
    />
  );
};

export default AutoCarousel;
