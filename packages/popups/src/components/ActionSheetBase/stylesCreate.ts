import {StyleSheet, ViewStyle} from 'react-native';
import {IThemeContext, rem} from '@npm/mobydick-styles';

const stylesCreate = (
  theme: IThemeContext,
  selected = false,
  leftIcon = false,
) => {
  const {colors, spaces} = theme;

  const flexStyle = (): ViewStyle => {
    if (leftIcon || selected) {
      return {
        justifyContent: selected ? 'space-between' : 'flex-start',
        flexDirection: 'row',
      };
    }
    return {justifyContent: 'center'};
  };

  return StyleSheet.create({
    containerStyle: {
      width: '100%',
    },
    item: {
      backgroundColor: colors.BgSecondary,
      alignItems: 'center',
      paddingHorizontal: rem(20),
      marginHorizontal: spaces.Space8,
      minHeight: rem(50),

      ...flexStyle(),
    },
    title: {
      flexDirection: 'column',
      justifyContent: 'center',
      paddingVertical: rem(15),
    },
    leftIcon: {
      paddingRight: rem(18),
    },
    leftIconView: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    firstItem: {
      borderTopLeftRadius: spaces.Space12,
      borderTopRightRadius: spaces.Space12,
    },
    innerItem: {
      borderTopWidth: 1,
      borderTopColor: colors.BorderSoft,
    },
    lastItem: {
      borderBottomLeftRadius: spaces.Space12,
      borderBottomRightRadius: spaces.Space12,
      marginBottom: spaces.Space8,
      borderTopWidth: 1,
      borderTopColor: colors.BorderSoft,
    },
    cancelItem: {
      borderRadius: spaces.Space12,
      marginBottom: rem(30),
    },
    checkIcon: {
      backgroundColor: colors.IconBase,
      borderRadius: theme.spaces.Space64,
      padding: theme.spaces.Space2,
    },
    label: {
      textAlign: 'center',
      paddingVertical: rem(15),
    },
    textSelected: {
      paddingVertical: rem(15),
    },
  });
};

export default stylesCreate;