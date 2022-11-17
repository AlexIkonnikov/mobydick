import React, {FC, RefObject, useMemo, useState} from 'react';
import {Animated, Dimensions, StyleProp, ViewStyle} from 'react-native';
import {useStyles} from '@npm/mobydick-styles';
import {ITouchableOpacity} from '@npm/mobydick-core';

import {PopupBase} from '../PopupBase';
import {IPopup, IPosition} from '../../types';

import stylesCreate from './stylesCreate';
import Title from './Title';
import DescriptionText from './DescriptionText';
import Arrow from './Arrow';
import LeftButton from './LeftButton';
import {IPlacement} from './types';

const {height} = Dimensions.get('window');

const TooltipBase: FC<
  Omit<IPopup, 'Content'> & {
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    position: IPosition;
    placement: IPlacement;
    refCurrent: RefObject<ITouchableOpacity>;
  }
> & {
  Title: typeof Title;
  DescriptionText: typeof DescriptionText;
  Arrow: typeof Arrow;
  LeftButton: typeof LeftButton;
} = props => {
  const {
    containerStyle,
    children,
    onClose,
    overlayStyle,
    position,
    placement,
    refCurrent,
  } = props;
  const [styles] = useStyles(stylesCreate);
  const {width} = Dimensions.get('window');

  const [positionValueY, setPositionValueY] = useState(0);
  const [positionValueX, setPositionValueX] = useState(0);

  useMemo(() => {
    refCurrent?.current?.measure((_x, _y, _width, _height, _pageX, pageY) => {
      if (pageY) {
        const androidValue = height - pageY;

        position === IPosition.top
          ? setPositionValueY(pageY + _height)
          : setPositionValueY(androidValue);

        placement === IPlacement.start
          ? setPositionValueX(_pageX)
          : setPositionValueX(width - _pageX - _width);
      }
    });
  }, []);

  if (positionValueY === 0) {
    return null;
  }

  return (
    <PopupBase
      onClose={onClose}
      overlayStyle={[styles.overlayStyle, overlayStyle]}>
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          position === IPosition.top && {
            top: positionValueY,
          },
          position === IPosition.bottom && {
            bottom: positionValueY,
          },
          placement === IPlacement.start && {
            left: positionValueX,
          },
          placement === IPlacement.end && {
            right: positionValueX,
          },
        ]}>
        {children}
      </Animated.View>
    </PopupBase>
  );
};

TooltipBase.Title = Title;
TooltipBase.DescriptionText = DescriptionText;
TooltipBase.Arrow = Arrow;
TooltipBase.LeftButton = LeftButton;
export default TooltipBase;
