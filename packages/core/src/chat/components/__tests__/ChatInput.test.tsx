import {render} from '@testing-library/react-native';
import React from 'react';

import ChatInput from '../ChatInput';

describe('@npm/mobydick-core/ChatInput', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <ChatInput>
        <ChatInput.ChatInputField value={'value'} />
        <ChatInput.ChatPressableIcon
          name={'icon-location'}
          onPress={() => null}
        />
      </ChatInput>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('renders correctly and style', () => {
    const {toJSON} = render(
      <ChatInput style={{flex: 1}}>
        <ChatInput.ChatInputField value={'value'} />
        <ChatInput.ChatPressableIcon
          name={'icon-location'}
          onPress={() => null}
        />
      </ChatInput>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
