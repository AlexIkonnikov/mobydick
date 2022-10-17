import React, {useState} from 'react';
import {DropDown, IInputsTypes} from '@npm/mobydick-inputs';
import {array, boolean, number, select, text} from '@storybook/addon-knobs';
import {
  iconNames,
  rem,
  SimpleIcon,
  SimpleIconName,
  useTheme,
} from '@npm/mobydick-styles';

import selectFont from '../../../utils/selectFont';

const ExampleArrayOfStrings = () => {
  const [selected, setSelected] = useState<string>();
  const {colors} = useTheme();

  return (
    <DropDown
      selectedItem={selected}
      placeholder={text('placeholder', 'Выберите язык')}
      label={text('title', 'Язык')}
      list={array('list', [
        'Русский',

        'English',

        'Deutsch',

        'Japanese',

        'Bulgarian',
      ])}
      onPress={item => setSelected(item.value)}
      disabled={boolean('disabled', false)}
      type={select('type', IInputsTypes, IInputsTypes.default)}
      subtitle={text('subtitle', '')}
      subtitleIcon={
        select(
          'subtitleIcon name',
          iconNames,
          'icon-arrow-down',
        ) as SimpleIconName
      }
      rightIcon={
        <SimpleIcon
          name={
            select('icon name', iconNames, 'icon-arrow-down') as SimpleIconName
          }
          color={colors.IconMuted}
        />
      }
      buttonStyle={{
        height: number('button height', rem(40)),
        width: number('button width', rem(300)),
      }}
      flatListStyle={{width: number('list width', rem(300))}}
      buttonTextFont={select('button font', selectFont, 'Regular-Muted-M')}
      labelFont={select('label font', selectFont, 'Medium-Tertiary-XS')}
      flatListTextFont={select(
        'flatlist font',
        selectFont,
        'Regular-Secondary-M',
      )}
      buttonTextFontChosen={select(
        'button chosen font',
        selectFont,
        'Medium-Primary-M',
      )}
      flatListTextFontPressed={select(
        'button pressed font',
        selectFont,
        'Medium-Primary-M',
      )}
    />
  );
};

export default ExampleArrayOfStrings;
