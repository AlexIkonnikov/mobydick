import React, {useState} from 'react';
import {boolean, number, select, text} from '@storybook/addon-knobs';

import {DropDown, IInputsTypes, rem, Typography} from '@npm/mobydick-core';

const ExampleArrayOfObjects = () => {
  const [selected, setSelected] = useState<number>();

  const listObject = [
    {label: 'Русский язык', value: 1},
    {label: 'English', value: 2},
    {label: 'Bengali', value: 3},
  ];

  return (
    <>
      <DropDown
        list={listObject}
        onPress={item => setSelected(item)}
        selectedItem={1 as number}
        placeholder={text('placeholder', 'Выберите язык')}
        title={text('title', 'Язык')}
        type={select('type', IInputsTypes, IInputsTypes.default)}
        buttonStyle={{
          height: number('button height', rem(40)),
          width: number('button width', rem(300)),
        }}
        required={boolean('required', false)}
        flatListStyle={{width: number('list width', rem(300))}}
      />
      <Typography>{JSON.stringify(selected, null, 2)}</Typography>
    </>
  );
};

export default ExampleArrayOfObjects;
