import React, {useCallback, useMemo, useState} from 'react';
import {LayoutAnimation, Platform, StyleSheet, UIManager} from 'react-native';

import {Typography} from '../../../typography';
import TouchableOpacity from '../../../basic/components/TouchableOpacity/TouchableOpacity';
import SimpleIcon from '../../../styles/icons/font/SimpleIcon';
import View from '../../../basic/components/View/View';
import {IThemeContext} from '../../../styles';
import useTheme from '../../../styles/theme/hooks/useTheme';
import useStyles from '../../../styles/theme/hooks/useStyles';
import {LABELS} from '../../constants';

import {ICollapsibleProps} from './types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Collapsible = (props: ICollapsibleProps) => {
  const {
    title,
    children,
    duration = 250,
    containerStyle,
    fontTitle = 'SemiBold-Secondary-M',
    headerStyle,
  } = props;
  const [styles] = useStyles(createStyles);
  const {colors} = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const onPress = useCallback(() => {
    setCollapsed(!collapsed);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(duration, 'linear', 'opacity'),
    );
  }, [collapsed, duration]);

  const name = useMemo(() => {
    return collapsed ? 'icon-arrow-down' : 'icon-arrow-right';
  }, [collapsed]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.header, headerStyle]}
        accessibilityLabel={LABELS.collapsed}>
        <Typography font={fontTitle}>{title}</Typography>
        <SimpleIcon name={name} color={colors.IconNeutral} />
      </TouchableOpacity>
      {collapsed && children}
    </View>
  );
};

const createStyles = ({spaces}: IThemeContext) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: spaces.Space20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default Collapsible;
