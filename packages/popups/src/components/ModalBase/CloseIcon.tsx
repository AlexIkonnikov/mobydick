import React, {FC} from 'react';
import {Exit, useStyles} from '@npm/mobydick-styles';
import {TouchableOpacity} from '@npm/mobydick-core';

import stylesCreate from '../PopupBase/stylesCreate';
import {IPopupCloseIcon} from '../PopupBase/types';

const CloseIcon: FC<IPopupCloseIcon> = props => {
  const [styles] = useStyles(stylesCreate);
  const {onPress} = props;

  return (
    <TouchableOpacity style={styles.closeButton} onPress={onPress}>
      <Exit fill={styles.closeButton.fill} />
    </TouchableOpacity>
  );
};

export default CloseIcon;
