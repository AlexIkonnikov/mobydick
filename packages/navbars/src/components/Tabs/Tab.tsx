import React from 'react';
import {TouchableOpacity} from '@npm/mobydick-core';
import {Typography} from '@npm/mobydick-typography';
import {useStyles} from '@npm/mobydick-styles';

import {ITabProps} from '../../types';

import stylesCreate from './stylesCreate';
import {accessibilityLabels} from './constants';

const Tab = (props: ITabProps): JSX.Element => {
  const [styles, theme] = useStyles(stylesCreate);
  const {
    active,
    item,
    fontTab,
    fontActiveTab,
    backgroundColorTab,
    backgroundColorActiveTab,
  } = props;

  const backgroundColorActive =
    backgroundColorActiveTab || theme.colors.ElementBase;
  const backgroundColor = backgroundColorTab || theme.colors.BgTertiary;
  const font = fontTab || 'Regular-Tertiary-XS';
  const fontActive = fontActiveTab || 'Regular-White-XS';

  return (
    <TouchableOpacity
      onPress={item.onPress}
      accessibilityLabel={accessibilityLabels.tab}
      style={[
        styles.tab,
        {
          backgroundColor: active ? backgroundColorActive : backgroundColor,
        },
      ]}>
      {item.leftIcon ? item.leftIcon : null}
      <Typography font={active ? fontActive : font}>{item.value}</Typography>
      {item.rightIcon ? item.rightIcon : null}
    </TouchableOpacity>
  );
};

export default Tab;
