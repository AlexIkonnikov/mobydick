import {Text, TouchableOpacity} from '@npm/mobydick-core';
import React, {FC} from 'react';
import {Spinner} from '@npm/mobydick-progress';
import {useStyles} from '@npm/mobydick-styles';

import {ButtonProps, ISize, ITypes} from './types';
import stylesCreate from './stylesCreate';

const Button: FC<ButtonProps> = props => {
  const {
    style,
    text,
    leftIcon,
    rightIcon,
    size = ISize.fixed,
    type = ITypes.primary,
    loading = false,
    disabled = false,
    ...otherProps
  } = props;
  const [styles, theme] = useStyles(
    stylesCreate,
    disabled ? ITypes.disabled : type,
    size,
  );

  const Container: FC = ({children}) => (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={
        loading ||
        disabled ||
        type === ITypes.disabled ||
        type === ITypes.loading
      }
      {...otherProps}>
      {children}
    </TouchableOpacity>
  );

  if (loading || type === ITypes.loading)
    return (
      <Container>
        <Spinner fill={theme.colors.IconWhite} />
      </Container>
    );

  return (
    <Container>
      {leftIcon}
      {Boolean(text) && <Text style={styles.text}>{text}</Text>}
      {rightIcon}
    </Container>
  );
};
export default Button;