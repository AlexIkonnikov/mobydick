import {useStyles} from '@npm/mobydick-styles';
import React, {FC} from 'react';

import {ModalBase} from '../ModalBase';
import {IContentProps} from '../../types';

import stylesCreate from './stylesCreate';

interface IProps {
  title: string;
  descriptionText: string;
  buttonText?: string;
}

const ModalSuccess: FC<IContentProps & IProps> = props => {
  const {onClose, title, descriptionText, buttonText} = props;
  const [styles] = useStyles(stylesCreate);

  return (
    <ModalBase
      overlayStyle={styles.overlayStyle}
      containerStyle={styles.container}
      {...props}>
      <ModalBase.AlertContent />

      <ModalBase.TextContent title={title} descriptionText={descriptionText} />

      <ModalBase.VerticalButtonsView>
        <ModalBase.VerticalButton onPress={onClose} text={buttonText || 'OK'} />
      </ModalBase.VerticalButtonsView>
    </ModalBase>
  );
};

export default ModalSuccess;
