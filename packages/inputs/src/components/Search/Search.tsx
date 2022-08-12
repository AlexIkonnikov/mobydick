import React, {FC} from 'react';
import {Pressable, TextInput, View} from '@npm/mobydick-core';
import {SimpleIcon, useStyles} from '@npm/mobydick-styles';
import {useFont} from '@npm/mobydick-typography';

import {ISearchProps} from './types';
import stylesCreate from './stylesCreate';
import {accessibilityLabels, strings} from './constants';

const Search: FC<ISearchProps> = ({
  placeholder = strings.search,
  value,
  onChangeText = value => {
    console.log(
      `Search says: "Add onChangeText (╯°□°)╯︵ ┻━┻". Current value=${value}`,
    );
  },
  containerStyle,
  leftIcon,
  textInputContainerStyle,
  ...otherProps
}) => {
  const [styles] = useStyles(stylesCreate);
  const {fontStyle} = useFont();
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? leftIcon : <SimpleIcon name={'icon-search'} />}
      <TextInput
        accessibilityLabel={accessibilityLabels.search}
        style={[fontStyle, styles.textInput, textInputContainerStyle]}
        placeholder={placeholder}
        placeholderTextColor={fontStyle.color}
        value={value}
        onChangeText={onChangeText}
        {...otherProps}
      />
      {value ? (
        <Pressable
          accessibilityLabel={accessibilityLabels.cancel}
          onPress={() => onChangeText('')}
          style={styles.cancelIcon}>
          <SimpleIcon name={'icon-cancel'} size={20} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Search;