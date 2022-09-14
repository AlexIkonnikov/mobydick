import {IStyledTextProps, Typography} from '@npm/mobydick-typography';
import React from 'react';
import {SimpleIcon, SimpleIconName, useTheme} from '@npm/mobydick-styles';
import {View} from '@npm/mobydick-core';

import {ITypes} from './types';

interface ISubtitle {
  type: ITypes;
  subtitle: string;
  subtitleIcon?: SimpleIconName | undefined;
  subtitleProps?: IStyledTextProps | undefined;
}
const Subtitle = (props: ISubtitle) => {
  const {type, subtitle, subtitleIcon, subtitleProps} = props;
  const {colors, spaces} = useTheme();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {subtitleIcon && (
        <SimpleIcon
          name={subtitleIcon}
          size={spaces.Space16}
          color={type === ITypes.wrong ? colors.TextError : colors.TextMuted}
          style={{marginRight: spaces.Space4}}
        />
      )}
      <Typography
        font={type === ITypes.wrong ? 'Regular-Error-XXS' : 'Regular-Muted-XXS'}
        {...subtitleProps}>
        {subtitle}
      </Typography>
    </View>
  );
};
export default Subtitle;
