import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {boolean, number, select} from '@storybook/addon-knobs';

import {
  Button,
  Carousel,
  IButtonSize,
  ICarouselAlign,
  rem,
  Typography,
  useTheme,
  View,
} from '@npm/mobydick-core';
import useStyles from '@npm/mobydick-core/src/styles/theme/hooks/useStyles';

function range(from: number, to: number) {
  const offset = from;
  const length = to - from + 1;

  if (length < 0) {
    return [];
  }

  return [...Array(length).keys()].map(value => value + offset);
}

const CarouselExample = () => {
  const [styles] = useStyles(stylesCreate);
  const {colors} = useTheme();
  const [isOpen, setOpen] = useState(true);

  const itemWidth = number('itemWidth', 200);
  const itemHeight = number('itemHeight', 100);
  const sideMargin = number('sideMargin', 12);
  const activeItemId = number('activeItemId', 1);
  const data = number('length data', 6);
  const keyExtractor = useCallback(item => item.toString(), []);
  const isDots = boolean('isDots', true);
  const align = select('align', ICarouselAlign, ICarouselAlign.start);

  const sliderItem = useCallback(
    item => {
      return (
        <View
          style={{
            width: rem(itemWidth),
            height: rem(itemHeight),
            backgroundColor: colors.ElementBase,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography font={'Medium-White-H4'}>{item}</Typography>
        </View>
      );
    },
    [itemWidth, itemHeight],
  );

  return (
    <View style={styles.container}>
      <Button
        text={'open/close carousel'}
        onPress={() => setOpen(!isOpen)}
        size={IButtonSize.large}
      />
      {isOpen && (
        <Carousel
          data={range(1, data)}
          sliderItem={sliderItem}
          keyExtractor={keyExtractor}
          animateAutoScroll={boolean('animateAutoScroll', true)}
          isDots={isDots}
          sideMargin={rem(sideMargin)}
          itemWidth={rem(itemWidth)}
          activeItemId={activeItemId.toString()}
          align={align}
        />
      )}
    </View>
  );
};

export default CarouselExample;

const stylesCreate = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
      aspectRatio: 2,
    },
  });