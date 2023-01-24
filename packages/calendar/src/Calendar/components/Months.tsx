import React, {FC, useCallback} from 'react';
import {
  FlatList,
  IThemeContext,
  Pressable,
  Typography,
  useStyles,
} from '@npm/mobydick-core';
import {StyleSheet} from 'react-native';
import useTheme from '@npm/mobydick-core/src/styles/theme/hooks/useTheme';

import {localeConfigRu} from '../localeConfig';

interface IMonths {
  onCloseMonths: () => void;
  onPressMonth: (index: number) => void;
}

const Months: FC<IMonths> = props => {
  const [styles] = useStyles(stylesCreate);
  const {colors} = useTheme();

  const onPress = (index: number) => {
    props.onCloseMonths();
    props.onPressMonth(index);
  };

  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return (
        <Pressable
          style={({pressed}) => [
            styles.month,
            {backgroundColor: pressed ? colors.BgAccentSoft : colors.BgPrimary},
          ]}
          onPress={() => onPress(index)}>
          <Typography>{item}</Typography>
        </Pressable>
      );
    },
    [],
  );

  return (
    <FlatList
      data={localeConfigRu.monthNamesShort}
      style={styles.container}
      renderItem={renderItem}
      numColumns={3}
      scrollEnabled={false}
    />
  );
};

export default Months;

const stylesCreate = ({spaces}: IThemeContext) =>
  StyleSheet.create({
    month: {
      flex: 3,
      paddingVertical: spaces.Space20,
      alignItems: 'center',
      borderRadius: spaces.Space4,
    },
    container: {
      width: '100%',
      alignContent: 'center',
    },
  });
