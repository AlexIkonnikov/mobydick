import {Button, IButtonSize, IButtonTypes} from '@npm/mobydick-cta';
import {boolean, number, select, text} from '@storybook/addon-knobs';
import {iconNames, SimpleIcon, useTheme} from '@npm/mobydick-styles';
import React from 'react';
import {action} from '@storybook/addon-actions';

import selectFont from '../../../utils/selectFont';

enum IViewButton {
  leftIcon = 'leftIcon',
  noIcon = 'noIcon',
  rightIcon = 'rightIcon',
  onlyIcon = 'onlyIcon',
}

const getSpinnerColor = (type: IButtonTypes, disabled: boolean): string => {
  const {colors} = useTheme();
  if (disabled) {
    return colors.IconWhite;
  }
  switch (type) {
    case IButtonTypes.secondary:
    case IButtonTypes.tertiary:
      return colors.IconBase;
    default:
      return colors.IconWhite;
  }
};

const ExampleButton = () => {
  const type = select('type', IButtonTypes, IButtonTypes.primary);
  const textButton = text('text', 'text big text');
  const minWidth = number('minWidth', 0);
  const onPress = action('onPress');
  const size = select('size', IButtonSize, IButtonSize.fixed);
  const disabled = boolean('disabled', false);
  const loading = boolean('loading', false);
  const defaultFont =
    size === IButtonSize.small ? 'SemiBold-White-XS' : 'SemiBold-White-L';
  const font = select('Button font', selectFont, defaultFont);

  switch (select('view button', IViewButton, IViewButton.noIcon)) {
    case IViewButton.leftIcon:
      return (
        <Button
          text={textButton}
          onPress={onPress}
          type={type}
          disabled={disabled}
          loading={loading}
          size={size}
          font={font}
          leftIcon={
            <SimpleIcon
              name={select('left icon', iconNames, 'icon-plus')}
              color={getSpinnerColor(type, disabled)}
              size={24}
            />
          }
          style={{minWidth: minWidth}}
        />
      );
    case IViewButton.rightIcon:
      return (
        <Button
          text={textButton}
          onPress={onPress}
          type={type}
          disabled={disabled}
          loading={loading}
          size={size}
          font={font}
          rightIcon={
            <SimpleIcon
              name={select('left icon', iconNames, 'icon-plus')}
              color={getSpinnerColor(type, disabled)}
              size={24}
            />
          }
          style={{minWidth: minWidth}}
        />
      );
    case IViewButton.onlyIcon:
      return (
        <Button
          onPress={onPress}
          type={type}
          disabled={disabled}
          loading={loading}
          size={size}
          font={font}
          rightIcon={
            <SimpleIcon
              name={select('left icon', iconNames, 'icon-plus')}
              color={getSpinnerColor(type, disabled)}
              size={24}
            />
          }
          style={{minWidth: minWidth}}
        />
      );
    default:
      return (
        <Button
          text={textButton}
          onPress={onPress}
          type={type}
          disabled={disabled}
          loading={loading}
          size={size}
          font={font}
          style={{minWidth: minWidth}}
          count={number('count', 0)}
        />
      );
  }
};

export default ExampleButton;
