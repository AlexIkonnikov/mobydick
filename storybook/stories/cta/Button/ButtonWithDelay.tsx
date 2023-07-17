import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useThrottle} from '@lad-tech/mobydick-utils';
import {
  Button,
  HIT_SLOP,
  IButtonProps,
  IThemeContext,
  Pressable,
  rem,
  Typography,
  useTheme,
  View,
} from '@lad-tech/mobydick-core';
import useStyles from '@lad-tech/mobydick-core/src/styles/theme/hooks/useStyles';

const ButtonWithDelay = ({
  onPress = () => {
    console.log('biba');
  },
  ...otherProps
}: IButtonProps) => {
  const {throttledFn} = useThrottle(onPress);
  const [styles] = useStyles(stylesCreate);
  const {colors} = useTheme();

  const getStyle = useCallback(
    ({pressed}: {pressed: boolean}) => [
      {
        backgroundColor: pressed ? colors.BgError : colors.BgPrimary,
      },
    ],
    [colors.BgPrimary, colors.BgError],
  );
  return (
    <>
      <Button
        onPress={throttledFn}
        text={'biba'}
        style={{marginVertical: 10}}
        {...otherProps}
      />
      <View
        style={[
          styles.button,
          {
            padding: rem(10),
          },
        ]}>
        <Pressable style={getStyle} hitSlop={HIT_SLOP.small}>
          <Typography>{'HIT_SLOP.small'}</Typography>
        </Pressable>
      </View>
      <View
        style={[
          styles.button,
          {
            padding: rem(20),
          },
        ]}>
        <Pressable style={getStyle} hitSlop={HIT_SLOP.medium}>
          <Typography>{'HIT_SLOP.medium'}</Typography>
        </Pressable>
      </View>
      <View
        style={[
          styles.button,
          {
            padding: rem(30),
          },
        ]}>
        <Pressable style={getStyle} hitSlop={HIT_SLOP.large}>
          <Typography>{'HIT_SLOP.large'}</Typography>
        </Pressable>
      </View>
    </>
  );
};

const stylesCreate = ({spaces, colors}: IThemeContext) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.BgAccentSoft,
      marginVertical: spaces.Space4,
    },
  });

export default ButtonWithDelay;
