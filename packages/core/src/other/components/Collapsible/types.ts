import {
  LayoutAnimationProperty,
  LayoutAnimationType,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ReactChild} from 'react';

import {TypographyProp} from '../../../typography';

export interface ICollapsibleProps extends TouchableOpacityProps {
  title?: string;
  children?: ReactChild;
  duration?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  headerStyle?: ViewStyle | ViewStyle[];
  fontTitle?: TypographyProp;
  typeAnimation?: LayoutAnimationType;
  creationPropAnimation?: LayoutAnimationProperty;
}
