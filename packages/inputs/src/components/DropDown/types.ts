import {ReactElement} from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {IStyledTextProps, TypographyProp} from '@npm/mobydick-typography';

import {ITypes} from '../types';

export type IListItem = string | {label: string; value: unknown};

export interface IDropDownProps<ListItem extends IListItem> {
  label?: string;
  rightIcon?: ReactElement;
  placeholder: string;
  list: ListItem[];
  onPress: (item: ListItem) => void;
  type?: ITypes;
  disabled?: boolean;
  subtitle?: string;
  subtitleProps?: IStyledTextProps;
  selectedItem?: ListItem | undefined;
  navBarHeight?: number;
  buttonStyle?: ViewStyle | undefined;
  flatListStyle?: ViewStyle | undefined;
  flatListItemStyle?: ViewStyle | undefined;
  labelStyle?: TextStyle | undefined;
  labelFont?: TypographyProp | undefined;
  buttonTextStyle?: TextStyle | undefined;
  buttonTextStyleChosen?: TextStyle | undefined;
  buttonTextFont?: TypographyProp | undefined;
  buttonTextFontChosen?: TypographyProp | undefined;
  flatListTextStyle?: TextStyle | undefined;
  flatListTextStylePressed?: TextStyle | undefined;
  flatListTextFont?: TypographyProp | undefined;
  flatListTextFontPressed?: TypographyProp | undefined;
  selectedItemColor?: string | undefined;
  maxVisibleListLength?: number;
}

export interface IDropDownIconProps {
  isOpen: boolean;
  rightIcon?: ReactElement | undefined;
}
