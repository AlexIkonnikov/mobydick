import rem from '../../styles/utils/rem';
import {createStyles} from '../../styles';

const stylesCreate = createStyles(({spaces, colors}, disabled: boolean) => ({
  container: {
    width: rem(50),
    height: rem(30),
    borderRadius: spaces.Space20,
    padding: spaces.Space2,
    opacity: disabled ? 0.4 : 1,
  },
  switcher: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.ElementWhite,
    borderRadius: rem(25),
  },
}));

export default stylesCreate;
