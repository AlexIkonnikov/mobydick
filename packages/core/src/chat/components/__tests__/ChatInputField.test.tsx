import {act, render} from '@testing-library/react-native';
import React from 'react';

import ChatInputField from '../ChatInputField';
import {LABELS} from '../../../other';

describe('@npm/mobydick-core/ChatInputField', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <ChatInputField placeholder={'placeholder'} value={'value'} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('renders correctly focused/blur', () => {
    const {toJSON, getByLabelText} = render(<ChatInputField />);
    const TextInput = getByLabelText(LABELS.chatInputField);
    act(() => TextInput.props.onFocus());

    expect(toJSON()).toMatchSnapshot();

    act(() => TextInput.props.onBlur());

    expect(toJSON()).toMatchSnapshot();
  });
});
