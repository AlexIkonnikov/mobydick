import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {PopupBase} from '../PopupBase';
import {IPopup} from '../../types';
import {returnTrue} from '../../functions';
import useStyles from '../../../styles/theme/hooks/useStyles';
import View from '../../../basic/components/View/View';

import CloseIcon from './CloseIcon';
import DescriptionText from './DescriptionText';
import Title from './Title';
import VerticalButtonsView from './VerticalButtonsView';
import HorizontalButtonsView from './HorizontalButtonsView';
import AlertContent from './AlertContent';
import VerticalButton from './VerticalButton';
import ImageView from './ImageView';
import stylesCreate from './stylesCreate';
import TextContent from './TextContent';

const ModalBase: FC<
  Omit<IPopup, 'Content'> & {
    onClose: () => void;
    containerStyle?: StyleProp<ViewStyle>;
  }
> & {
  Title: typeof Title;
  CloseIcon: typeof CloseIcon;
  DescriptionText: typeof DescriptionText;
  VerticalButtonsView: typeof VerticalButtonsView;
  HorizontalButtonsView: typeof HorizontalButtonsView;
  VerticalButton: typeof VerticalButton;
  AlertContent: typeof AlertContent;
  ImageView: typeof ImageView;
  TextContent: typeof TextContent;
} = props => {
  const {children, overlayStyle, onClose, containerStyle} = props;
  const [styles] = useStyles(stylesCreate);

  return (
    <PopupBase
      onClose={onClose}
      overlayStyle={[styles.overlayStyle, overlayStyle]}>
      <View
        style={[styles.container, containerStyle]}
        onStartShouldSetResponder={returnTrue}>
        {children}
      </View>
    </PopupBase>
  );
};

ModalBase.Title = Title;
ModalBase.DescriptionText = DescriptionText;
ModalBase.CloseIcon = CloseIcon;
ModalBase.VerticalButtonsView = VerticalButtonsView;
ModalBase.HorizontalButtonsView = HorizontalButtonsView;
ModalBase.AlertContent = AlertContent;
ModalBase.VerticalButton = VerticalButton;
ModalBase.ImageView = ImageView;
ModalBase.TextContent = TextContent;
export default ModalBase;