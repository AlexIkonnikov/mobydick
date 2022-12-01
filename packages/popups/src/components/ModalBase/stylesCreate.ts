import {IThemeContext} from '@npm/mobydick-styles';
import {Dimensions, StyleSheet} from 'react-native';

const stylesCreate = (theme: IThemeContext) => {
  const {spaces, colors} = theme;
  const {width} = Dimensions.get('window');
  return StyleSheet.create({
    overlayStyle: {
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.BgSecondary,
      borderRadius: spaces.Space12,
      justifyContent: 'center',
      alignItems: 'center',
      width: width - spaces.Space8 * 2,
      padding: spaces.Space20,
      marginVertical: spaces.Space24,
    },
    closeButton: {
      alignSelf: 'flex-end',
      justifyContent: 'center',
      position: 'absolute',
      top: spaces.Space16,
      right: spaces.Space16,
    },
    alertView: {
      borderRadius: 100,
      padding: spaces.Space12,
      backgroundColor: colors.BgAccentSoft,
    },
    text: {
      marginTop: spaces.Space24,
      textAlign: 'center',
    },
    textContent: {
      marginTop: spaces.Space12,
      marginBottom: spaces.Space8,
    },
    title: {
      textAlign: 'center',
    },
    description: {
      textAlign: 'center',
      paddingTop: spaces.Space8,
    },
    verticalButtonsView: {
      marginTop: spaces.Space20,
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    horizontalButtonsView: {
      flexDirection: 'row',
      paddingTop: spaces.Space20,
    },
    horizontalLeftButton: {
      flex: 1,
      marginRight: spaces.Space6,
    },
    horizontalRightButton: {
      flex: 1,
      marginLeft: spaces.Space6,
    },
    imageView: {
      marginBottom: spaces.Space4,
    },
  });
};

export default stylesCreate;
