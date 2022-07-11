import React, {FC} from 'react';

import ControlType from './constants';
import CheckSquare from './CheckBox/CheckSquare';
import Circle from './Radio/Circle';
import {TControl} from './types';
import {IRadioStyle} from './Radio';

const Control: FC<TControl | Exclude<TControl, IRadioStyle>> = ({
  type,
  ...rest
}) => {
  return type === ControlType.checkBox ? (
    <CheckSquare style={{margin: 12}} {...rest} />
  ) : (
    <Circle {...rest} />
  );
};

export default Control;
