import {ViewStyle} from 'react-native';
import {ReactNode} from 'react';

export type IPopupId = string | symbol;

export interface IPopup {
  id: IPopupId;
  title?: string;
  style?: ViewStyle;
  onClose?: () => void;
  children?: ReactNode;
}

export interface IPopupsContext {
  popups: IPopup[];
  openPopup: (popup: Partial<IPopup>) => void;
  closePopup: (id: IPopupId) => void;
  closeAllPopups: () => void;
}
