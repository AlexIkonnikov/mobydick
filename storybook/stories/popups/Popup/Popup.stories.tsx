import React, {useState} from 'react';
import {storiesOf} from '@storybook/react-native';
import {Button} from '@npm/mobydick-cta';
import {PopupsProvider, usePopups} from '@npm/mobydick-popups';

import CenterView from '../../CenterView';

import TooltipExample from './TooltipExample';

const PopupExample = () => {
  const popupContext = usePopups();
  const [popupCount, setPopupCount] = useState(0);

  const onPress = () => {
    const newCount = popupCount + 1;

    setPopupCount(newCount);

    const pop = {
      title: newCount.toString(),
      children: (
        <Button
          onPress={() =>
            popupContext.openPopup({
              title: newCount + 'newNested',
              style: {width: 200, position: 'absolute', top: 5},
              children: pop['children'],
            })
          }
          text={'nested'}
        />
      ),
    };

    popupContext.openPopup(pop);
  };
  return <Button text={'Open Popup'} onPress={onPress} />;
};

storiesOf('Design System/Popups/Popup', module)
  .addDecorator(getStory => (
    <PopupsProvider>
      <CenterView>{getStory()}</CenterView>
    </PopupsProvider>
  ))
  .add('basic', () => <PopupExample />)
  .add('tooltip', () => <TooltipExample />);
