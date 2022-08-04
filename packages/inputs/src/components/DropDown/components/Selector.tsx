import React from 'react';
import {IPopupProps, PopupBase} from '@npm/mobydick-popups';
import {FlatList, TouchableHighlight, View} from '@npm/mobydick-core';
import {useDimensions} from '@react-native-community/hooks';
import {getModel} from 'react-native-device-info';
import {Typography} from '@npm/mobydick-typography';
import {useStyles} from '@npm/mobydick-styles';
import {StyleSheet, ViewStyle} from 'react-native';

import {
  DEFAULT_DROP_DOWN_HEIGHT,
  DEFAULT_DROP_DOWN_WIDTH,
  DEFAULT_LIST_FOOTER_HEIGHT,
} from '../constants';
import {getDropDownDimensions} from '../utils/getDropDownDimensions';
import getIosSafeAreaHeights from '../utils/getIosSafeAreaHeights';
import stylesCreate from '../stylesCreate';
import {IDropDownProps} from '../types';

const keyExtractor = (item: string, index: number) =>
  index.toString() + item.toString();

const renderFooterComponent = (isNeedFooterComponent: boolean) => {
  if (isNeedFooterComponent) {
    return <View style={{height: DEFAULT_LIST_FOOTER_HEIGHT}} />;
  } else {
    return <View />;
  }
};

interface IRenderItemProps
  extends Pick<
    IItemsProps,
    | 'renderItemOnPress'
    | 'selectedItem'
    | 'selectedItemColor'
    | 'addFlatListItemStyle'
    | 'addFlatListTextStylePressed'
    | 'addFlatListTextFontPressed'
    | 'addFlatListTextStyle'
    | 'addFlatListTextFont'
  > {
  dropDownItemHeight: number;
  styles: StyleSheet.NamedStyles<{dropDownItem: ViewStyle}>;
  theme: ReturnType<typeof useStyles>[1];
}
const renderItem =
  (props: IRenderItemProps) =>
  ({item}: {item: string}) => {
    const {
      renderItemOnPress,

      styles,
      theme,

      dropDownItemHeight,
      selectedItemColor,
      selectedItem,

      addFlatListItemStyle,
      addFlatListTextStylePressed,
      addFlatListTextStyle,
      addFlatListTextFontPressed,
      addFlatListTextFont,
    } = props;

    const getFont = () => {
      if (item === selectedItem) {
        return addFlatListTextFontPressed || 'Medium-Primary-M';
      }
      return addFlatListTextFont || 'Regular-Secondary-M';
    };

    return (
      <TouchableHighlight
        accessibilityLabel={item}
        style={[
          styles.dropDownItem,
          addFlatListItemStyle,
          {
            height: addFlatListItemStyle?.height
              ? addFlatListItemStyle.height
              : dropDownItemHeight,
          },
          item === selectedItem
            ? selectedItemColor
              ? {backgroundColor: selectedItemColor}
              : {backgroundColor: theme.colors.BgAccentSoft}
            : null,
        ]}
        onPress={() => renderItemOnPress(item)}
        underlayColor={
          selectedItemColor ? selectedItemColor : theme.colors.BgAccentSoft
        }>
        <Typography
          style={
            item === selectedItem
              ? addFlatListTextStylePressed
              : addFlatListTextStyle
          }
          font={getFont()}>
          {item}
        </Typography>
      </TouchableHighlight>
    );
  };

interface IItemsProps
  extends IPopupProps,
    Pick<
      IDropDownProps,
      | 'navBarHeight'
      | 'maxVisibleListLength'
      | 'list'
      | 'selectedItem'
      | 'selectedItemColor'
      | 'addButtonStyle'
      | 'addFlatListStyle'
      | 'addFlatListItemStyle'
      | 'addFlatListTextStyle'
      | 'addFlatListTextFont'
      | 'addFlatListTextFontPressed'
      | 'addFlatListTextStylePressed'
    > {
  list: string[];
  pageY: number;
  renderItemOnPress: (item: string) => void;
}
const Selector = (props: IItemsProps) => {
  const {
    list,
    pageY,
    navBarHeight = 50,
    maxVisibleListLength = 6,

    renderItemOnPress,

    selectedItem,
    selectedItemColor,

    addButtonStyle,
    addFlatListStyle,
    addFlatListTextFont,
    addFlatListItemStyle,
    addFlatListTextStyle,
    addFlatListTextStylePressed,
  } = props;
  const [styles, theme] = useStyles(stylesCreate);

  const {height} = useDimensions().window;

  const {topIosMargin, bottomIosMargin} = getIosSafeAreaHeights(getModel());

  const isNeedFooterComponent = list.length > maxVisibleListLength;

  const {
    listAbovePosition,
    listUnderPosition,
    expectedEndPositionOnScreen,
    dropDownMaxHeight,
    dropDownItemHeight,
  } = getDropDownDimensions({
    pageY,
    topIosMargin,
    navBarHeight,
    bottomIosMargin,
    maxVisibleListLength,
    dropDownHeight: addButtonStyle?.height
      ? +addButtonStyle.height
      : DEFAULT_DROP_DOWN_HEIGHT,
    flatListPaddingVertical: addFlatListStyle?.paddingVertical
      ? +addFlatListStyle.paddingVertical
      : styles.flatList.paddingVertical,
    listLength: list.length,
    addFlatListItemHeight: addFlatListItemStyle?.height
      ? +addFlatListItemStyle.height
      : undefined,
  });
  return (
    <PopupBase
      onClose={props.onClose}
      overlayStyle={{backgroundColor: 'transparent'}}>
      <FlatList
        bounces={false}
        style={[
          styles.flatList,
          addFlatListStyle,
          {
            width: addFlatListStyle?.width
              ? addFlatListStyle.width
              : addButtonStyle?.width
              ? addButtonStyle.width
              : DEFAULT_DROP_DOWN_WIDTH,
          },
          expectedEndPositionOnScreen > height
            ? {top: listAbovePosition}
            : {top: listUnderPosition},
          {
            maxHeight: dropDownMaxHeight,
          },
        ]}
        data={list}
        renderItem={renderItem({
          renderItemOnPress,
          dropDownItemHeight,
          selectedItemColor,

          selectedItem,
          styles,
          theme,
          addFlatListItemStyle,
          addFlatListTextFont,
          addFlatListTextStyle,
          addFlatListTextStylePressed,
        })}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooterComponent(isNeedFooterComponent)}
      />
    </PopupBase>
  );
};

export default Selector;
