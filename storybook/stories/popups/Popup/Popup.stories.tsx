import React, {RefObject, useRef} from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  Button,
  IButtonSize,
  ITouchableOpacity,
  View,
  usePopups,
} from '@npm/mobydick-core';
import {select, text} from '@storybook/addon-knobs';
import {IButtonView, IChangeDate, ModalCalendar} from '@npm/mobydick-calendar';

import CenterView from '../../CenterView';

import ExampleSnackbar from './ExampleSnackbar';
import ExampleActionSheet from './ExampleActionSheet';
import ExampleTooltip from './ExampleTooltip';
import PopupModalExample from './PopupModalExample';

const PopupTooltipExample = () => {
  const popupContext = usePopups();
  const viewRef = useRef<ITouchableOpacity>(null);
  const viewRef2 = useRef<ITouchableOpacity>(null);
  const viewRef3 = useRef<ITouchableOpacity>(null);
  const viewRef4 = useRef<ITouchableOpacity>(null);
  const viewRef5 = useRef<ITouchableOpacity>(null);

  const openPopup = (ref: RefObject<ITouchableOpacity>) => {
    if (ref.current) {
      popupContext.openPopup({
        id: 'TOOLTIP_POPUP_ID',
        Content: propsFromPopup => (
          <ExampleTooltip
            {...propsFromPopup}
            refCurrent={ref}
            fixedButton={ref === viewRef3}
          />
        ),
      });
    }
  };

  return (
    <View
      style={{
        margin: 20,
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
      <Button
        ref={viewRef}
        size={IButtonSize.small}
        text={'What is it?'}
        onPress={() => openPopup(viewRef)}
        style={{margin: 10}}
      />
      <Button
        ref={viewRef2}
        size={IButtonSize.large}
        text={'What is it1?'}
        onPress={() => openPopup(viewRef2)}
        style={{marginBottom: 10}}
      />
      <Button
        ref={viewRef3}
        text={'What is it3?'}
        onPress={() => openPopup(viewRef3)}
        style={{marginBottom: 10}}
      />
      <Button
        ref={viewRef4}
        size={IButtonSize.large}
        text={'What is it4?'}
        onPress={() => openPopup(viewRef4)}
        style={{marginBottom: 10, alignSelf: 'center'}}
      />
      <Button
        ref={viewRef5}
        size={IButtonSize.small}
        text={'What is it5?'}
        onPress={() => openPopup(viewRef5)}
        style={{marginBottom: 10, alignSelf: 'center'}}
      />
    </View>
  );
};

const SnackbarPopupExample = () => {
  const popupContext = usePopups();

  const onPress = () => {
    popupContext.openPopup({
      Content: ExampleSnackbar,
    });
  };

  return (
    <View>
      <Button
        text={'Нажми и появится выплывашка'}
        onPress={onPress}
        size={IButtonSize.fixed}
      />
    </View>
  );
};

const ActionSheetPopupExample = () => {
  const popupContext = usePopups();

  const onPress = () => {
    popupContext.openPopup({
      Content: ExampleActionSheet,
    });
  };
  return (
    <View>
      <Button text={'Нажми'} onPress={onPress} size={IButtonSize.large} />
    </View>
  );
};

const CalendarPopupExample = () => {
  const popupContext = usePopups();

  const onPress = () => {
    popupContext.openPopup({
      Content: propsFromPopup => (
        <ModalCalendar
          onChangeDate={(date?: IChangeDate) =>
            console.log('onChangeDate', date?.dateStart, date?.dateEnd)
          }
          textCalendar={text(
            'textCalendar',
            'Выберите интервал, в который хотите пойти в отпуск',
          )}
          buttonView={select('buttonView', IButtonView, IButtonView.large)}
          {...propsFromPopup}
        />
      ),
    });
  };
  return (
    <View>
      <Button text={'Нажми'} onPress={onPress} size={IButtonSize.large} />
    </View>
  );
};
storiesOf('Design System/Popups/Popup', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Modal', () => <PopupModalExample />)
  .add('Snackbar', () => <SnackbarPopupExample />)
  .add('Action sheet', () => <ActionSheetPopupExample />)
  .add('Calendar', () => <CalendarPopupExample />)
  .add('Tooltip', () => <PopupTooltipExample />);
