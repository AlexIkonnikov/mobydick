import {render} from '@testing-library/react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ITouchableOpacity} from '@npm/mobydick-core';
import {Button} from '@npm/mobydick-cta';

import TooltipBase from '../TooltipBase';
import {IPlacement, IPosition} from '../types';

describe('@npm/mobydick-popups/TooltipBase/TooltipBase', () => {
  let buttonRef: React.RefObject<ITouchableOpacity>;
  beforeEach(() => {
    buttonRef = React.createRef();
    render(<Button ref={buttonRef} />);
  });
  it('should renders correctly ', () => {
    jest
      .spyOn(buttonRef.current as TouchableOpacity, 'measure')
      .mockImplementation(
        (
          cb: (
            x: number,
            y: number,
            width: number,
            height: number,
            pageX: number,
            pageY: number,
          ) => void,
        ) => cb(0, 0, 1, 1, 287, 2410),
      );

    const {toJSON} = render(
      <TooltipBase
        id={'id'}
        onClose={() => null}
        position={IPosition.bottom}
        placement={IPlacement.center}
        refCurrent={buttonRef}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
