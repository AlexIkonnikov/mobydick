import {StyleSheet} from 'react-native';
import {IThemeContext, rem} from '@npm/mobydick-styles';

const stylesCreate = (theme: IThemeContext) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '95%',
      height: rem(36),
      backgroundColor: theme.colors.BgSecondary,
      borderRadius: theme.spaces.Space8,
      paddingLeft: theme.spaces.Space12,
      paddingRight: theme.spaces.Space8,
    },
    textInput: {
      flex: 1,
      padding: 0, // Android по дефолту ставит padding на input's
      paddingHorizontal: theme.spaces.Space8,
    },
    cancelIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.BgTertiary,
      borderRadius: rem(24),
      padding: theme.spaces.Space4,
    },
  });

export default stylesCreate;
