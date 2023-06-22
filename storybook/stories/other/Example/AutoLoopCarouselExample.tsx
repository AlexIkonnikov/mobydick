import React, {useCallback} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {number, select} from '@storybook/addon-knobs';

import {rangeDataCarousel} from './components/RangeDataCarousel';
import SliderItem from './components/SliderItem';

import {AutoLoopCarousel, ICarouselAlign, rem, View} from '@npm/mobydick-core';
import useStyles from '@npm/mobydick-core/src/styles/theme/hooks/useStyles';

const AutoLoopCarouselExample = () => {
  const [styles] = useStyles(stylesCreate);
  const {width: WIDTH, height: HEIGHT} = useWindowDimensions();

  const sideMargin = number('sideMargin', 5);
  const activeItemId = number('activeItemId', 1);
  const data = number('length data', 3);
  const align = select('align', ICarouselAlign, ICarouselAlign.start);
  const timerAuto = number('timerAuto', 2000);

  const itemWidth = number('itemWidth', WIDTH - 10);
  const itemHeight = number('itemHeight', HEIGHT);
  const sliderItem = useCallback(
    (item: number) => {
      return <SliderItem item={item} width={itemWidth} height={itemHeight} />;
    },
    [itemWidth, itemHeight],
  );

  return (
    <View style={styles.container}>
      <AutoLoopCarousel
        data={rangeDataCarousel(1, data)}
        sliderItem={sliderItem}
        sideMargin={rem(sideMargin)}
        itemWidth={itemWidth}
        activeItemId={activeItemId.toString()}
        align={align}
        ms={timerAuto}
      />
    </View>
  );
};

const stylesCreate = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  });

export default AutoLoopCarouselExample;
