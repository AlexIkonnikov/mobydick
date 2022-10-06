import React from 'react';
import {render} from '@testing-library/react-native';

import SnackbarBase from '../SnackbarBase';
import {IPosition} from '../../../types';

describe('@npm/mobydick-popups/SnackbarBase', () => {
  jest.useFakeTimers();
  it('should renders correctly', () => {
    const onClose = jest.fn();
    const {toJSON} = render(
      <SnackbarBase id={'id'} onClose={onClose} position={IPosition.top} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('should renders correctly with timeShow', () => {
    const onClose = jest.fn();
    const {toJSON} = render(
      <SnackbarBase
        id={'id'}
        onClose={onClose}
        position={IPosition.top}
        timeShow={1000}
      />,
    );
    jest.runAllTimers();
    expect(toJSON()).toMatchSnapshot();
  });
});
