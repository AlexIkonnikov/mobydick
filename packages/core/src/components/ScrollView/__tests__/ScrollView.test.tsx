import React from 'react';
import {render} from '@testing-library/react-native';

import ScrollView from '../ScrollView';

describe('@npm/mobydick-core/ScrollView', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<ScrollView />);
    expect(toJSON()).toMatchSnapshot();
  });
});
