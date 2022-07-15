import {IUseStylesTheme} from '@npm/mobydick-styles';
import {StyleSheet} from 'react-native';

const stylesCreate = (theme: IUseStylesTheme) => {
  const {colors} = theme;

  return StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      margin: 8,
      backgroundColor: colors.IconFavorite,
    },
    arrow: {
      position: 'absolute',
      borderRadius: 4,
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
    },
    title: {
      fontSize: 14,
      zIndex: 1,
      color: colors.TextPrimary,
    },
    descriptionText: {
      fontSize: 14,
      zIndex: 1,
      color: colors.TextPrimary,
    },
  });
};

export default stylesCreate;
