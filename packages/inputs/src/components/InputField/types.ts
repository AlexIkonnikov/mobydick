import {ITextInputProps} from '@npm/mobydick-core';
import {ReactElement} from 'react';
import {IStyledTextProps} from '@npm/mobydick-typography';
import {StyleProp, ViewStyle} from 'react-native';

interface IInputFieldsProps {
  title?: string;
  titleProps?: IStyledTextProps;
  subtitle?: string;
  subtitleProps?: IStyledTextProps;
  containerStyle?: StyleProp<ViewStyle>;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactElement;
  type?: ITypes;
  disabled?: boolean;
}

export enum ITypes {
  default = 'default',
  valid = 'valid',
  wrong = 'wrong',
  disabled = 'disabled',
}
export type InputFieldProps = ITextInputProps & IInputFieldsProps;
