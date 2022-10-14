import {Button, IButtonSize, IButtonTypes} from '@npm/mobydick-cta';
import {boolean, number, select, text} from '@storybook/addon-knobs';
import {iconNames, SimpleIcon} from '@npm/mobydick-styles';
import React from 'react';
import {action} from '@storybook/addon-actions';

import selectFont from '../../../utils/selectFont';

enum IViewButton {
  leftIcon = 'leftIcon',
  noIcon = 'noIcon',
  rightIcon = 'rightIcon',
  counter = 'counter',
  onlyIcon = 'onlyIcon',
}

const getIconColor = (type: IButtonTypes): string => {
  switch (type) {
    case IButtonTypes.secondary:
    case IButtonTypes.tertiary:
      return '#2B78EE';
    default:
      return '#fff';
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
              color={getIconColor(type)}
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
              color={'#fff'}
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
              color={'#fff'}
              size={24}
            />
          }
          style={{minWidth: minWidth}}
        />
      );
    case IViewButton.noIcon:
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
        />
      );
  }
};

export default ExampleButton;
