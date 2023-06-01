import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

import rem from '../../../styles/spaces/rem';
import TouchableOpacity from '../../../basic/components/TouchableOpacity/TouchableOpacity';
import {LABELS} from '../../constants';
import useStyles from '../../../styles/theme/hooks/useStyles';
import Dots from '../Dots/Dots';
import {isNumber} from '../../functions/isNumber';

import stylesCreate from './stylesCreate';
import {ICarouselAlign, ICarouselProps} from './types';

interface IError {
  index: number;
  highestMeasuredFrameIndex: number;
  averageItemLength: number;
}

const Carousel = <T,>({
  data,
  sliderItem,
  keyExtractor,
  loading = false,
  sideMargin = rem(10),
  itemWidth,
  onPressItem,
  activeItemId,
  averageItemLength,
  animateAutoScroll = false,
  isDots = false,
  onActiveChange,
  align = ICarouselAlign.start,
  onLayout,
  onEndReached,
  initialNumToRender,
  onScroll,
  autoScroll = false,
  timerAuto = 2000,
  ...otherProps
}: ICarouselProps<T>): JSX.Element => {
  const ref = useRef<FlatList>(null);
  const [styles] = useStyles(stylesCreate, sideMargin);
  const [slidePosition, setSlidePosition] = useState<number>(0);

  const widthSnap = itemWidth + sideMargin * 2;
  const {width: WIDTH} = useSafeAreaFrame();

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
    waitForInteraction: false,
  }).current;

  const initScroll = useCallback(() => {
    const selectedIndex = data.findIndex(
      item => keyExtractor(item) === activeItemId,
    );
    if (selectedIndex > -1 && selectedIndex !== slidePosition) {
      setSlidePosition(selectedIndex);
      ref.current?.scrollToOffset({
        offset: widthSnap * selectedIndex,
        animated: animateAutoScroll,
      });
    }
  }, [
    activeItemId,
    slidePosition,
    data,
    keyExtractor,
    widthSnap,
    animateAutoScroll,
  ]);

  const onPress = useCallback(
    (item: T) => () => {
      !loading && onPressItem && onPressItem(item);
    },
    [loading, onPressItem],
  );

  const renderItem = useCallback(
    ({item, index}: {item: T; index: number}) => {
      return (
        <TouchableOpacity
          onPress={onPress(item)}
          disabled={Boolean(!onPressItem || loading)}
          accessibilityLabel={LABELS.carouselItem}
          style={styles.item}>
          {sliderItem(item, index, data)}
        </TouchableOpacity>
      );
    },
    [data, onPress, onPressItem, loading, sliderItem],
  );
  const onScrollToIndexFailed = useCallback(
    (error: IError) => {
      if (averageItemLength) {
        ref.current?.scrollToOffset({
          offset: averageItemLength * error.index,
          animated: animateAutoScroll,
        });
      }
    },
    [averageItemLength, animateAutoScroll],
  );

  const visibleElementsCount = Math.floor(WIDTH / widthSnap);

  const handleOnViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (!viewableItems[0]) {
        return;
      }
      if (align === ICarouselAlign.start) {
        const index = viewableItems[0]?.index;
        if (isNumber(index)) {
          setSlidePosition(index);
        }
        typeof onActiveChange === 'function' &&
          onActiveChange(viewableItems[0]?.item);
      } else {
        const length = viewableItems.length;
        const count = viewableItems[0]?.index === 0 ? length - 1 : length + 1;
        const currLength = visibleElementsCount > length ? count : length;
        const isEven = currLength % 2 === 0;

        const middleVisibleElement =
          isEven && viewableItems[0]?.index === 0
            ? Math.floor(currLength / 2) - 1
            : Math.floor(currLength / 2);

        const index = viewableItems[middleVisibleElement]?.index;

        if (isNumber(index)) {
          setSlidePosition(index);
        }

        typeof onActiveChange === 'function' &&
          onActiveChange(viewableItems[middleVisibleElement]?.item);
      }
    },
  ).current;

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    const timerAutoScroll = setInterval(() => {
      setSlidePosition(state => {
        ref.current?.scrollToIndex({
          animated: true,
          index: state + 1,
        });
        return state + 1;
      });
    }, timerAuto);

    if (slidePosition === data.length - 1) {
      clearInterval(timerAutoScroll);
    }

    return () => clearInterval(timerAutoScroll);
  }, [slidePosition, data.length, autoScroll, timerAuto]);

  return (
    <>
      <FlatList
        ref={ref}
        data={data}
        extraData={loading}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        onLayout={onLayout || initScroll}
        accessibilityLabel={LABELS.carousel}
        snapToAlignment={align}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScrollToIndexFailed={onScrollToIndexFailed}
        snapToInterval={widthSnap}
        decelerationRate={0}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        initialNumToRender={initialNumToRender || 10}
        {...otherProps}
      />
      {isDots && (
        <Dots
          length={data.length}
          activeDot={slidePosition}
          animateAutoScroll={animateAutoScroll}
        />
      )}
    </>
  );
};

export default Carousel;
