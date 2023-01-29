import React, {FC, useCallback} from 'react';

import Constants from '../PopupBase/constants';
import useStyles from '../../../styles/theme/hooks/useStyles';
import useTheme from '../../../styles/theme/hooks/useTheme';
import Pressable from '../../../basic/components/Pressable/Pressable';

import stylesCreate from './stylesCreate';
import Contents from './content/Contents';
import {IPropsItem} from './types';

const Item: FC<IPropsItem> = props => {
  const {onPress, style, disabled, itemType, isStatusPressedForTest} = props;
  const [styles] = useStyles(stylesCreate, itemType);
  const {colors} = useTheme();

  const getStyle = useCallback(
    ({pressed}) => [
      styles.item,
      {backgroundColor: pressed ? colors.BgSecondary : colors.BgPrimary},
      style,
    ],
    [],
  );

  return (
    <Pressable
      style={getStyle}
      disabled={disabled}
      onPress={onPress}
      accessibilityLabel={Constants.accessibilityLabelActionSheetsItem}
      testOnly_pressed={isStatusPressedForTest}>
      <Contents {...props} />
    </Pressable>
  );
};

export default Item;
