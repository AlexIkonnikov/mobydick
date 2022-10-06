import React, {FC, useEffect, useRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {View} from '@npm/mobydick-core';
import {useStyles} from '@npm/mobydick-styles';

import {IPopup, IPosition} from '../../types';

import Title from './Title';
import stylesCreate from './stylesCreate';

const SnackbarBase: FC<
  Omit<IPopup, 'Content'> & {
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    position: IPosition;
    timeShow?: number;
  }
> & {Title: typeof Title} = props => {
  const {children, onClose, containerStyle, overlayStyle, position, timeShow} =
    props;
  const [styles] = useStyles(stylesCreate, position);

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeout.current = setTimeout(
      () => {
        onClose();
      },
      timeShow ? timeShow : 5000,
    );

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);

  return (
    <View style={[styles.overlayStyle, overlayStyle]}>
      <View style={[styles.container, containerStyle]}>{children}</View>
    </View>
  );
};

SnackbarBase.Title = Title;
export default SnackbarBase;
