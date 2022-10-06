import React, {FC, useEffect, useRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {View} from '@npm/mobydick-core';
import {useStyles} from '@npm/mobydick-styles';

import {IPopup, IPosition} from '../../types';

import Title from './Title';
import stylesCreate from './stylesCreate';

const DEFAULT_TIME_SHOW = 5000;

const SnackbarBase: FC<
  Omit<IPopup, 'Content'> & {
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    position: IPosition;
    timeShow?: number;
  }
> & {Title: typeof Title} = props => {
  const {
    children,
    onClose,
    containerStyle,
    overlayStyle,
    position,
    timeShow,
    id,
  } = props;
  const [styles] = useStyles(stylesCreate, position);

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => {
        onClose();
      },
      timeShow ? timeShow : DEFAULT_TIME_SHOW,
    );

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [id]);

  return (
    <View style={[styles.overlayStyle, overlayStyle]}>
      <View style={[styles.container, containerStyle]}>{children}</View>
    </View>
  );
};

SnackbarBase.Title = Title;
export default SnackbarBase;
