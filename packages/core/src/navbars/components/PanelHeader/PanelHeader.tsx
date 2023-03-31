import React, {FC, useCallback, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import View from '../../../basic/components/View/View';
import {Typography} from '../../../typography';
import {IThemeContext, useStyles} from '../../../styles';
import rem from '../../../styles/spaces/rem';
import {IPanelHeaderProps} from '../../types';
import {LABELS} from '../../../other';

const PanelHeader: FC<IPanelHeaderProps> = props => {
  const {
    title,
    titleFont = 'SemiBold-Secondary-M',
    titleStyle,
    titleViewStyle,
    titleView,
    rightView,
    leftView,
    subtitle,
    subtitleFont = 'Regular-Tertiary-XXS',
    subtitleStyle,
    containerStyle,
    rightViewStyle,
    leftViewStyle,
    commonViewStyle,
  } = props;

  const [styles] = useStyles(createStyles);
  const [widthLeftView, setWidthLeftView] = useState(rem(24));
  const [widthRightView, setWidthRightView] = useState(rem(24));

  const onLayoutLeftView = useCallback((event: LayoutChangeEvent) => {
    setWidthLeftView(event.nativeEvent.layout.width);
  }, []);

  const onLayoutRightView = useCallback((event: LayoutChangeEvent) => {
    setWidthRightView(event.nativeEvent.layout.width);
  }, []);

  return (
    <View style={[styles.commonView, commonViewStyle]}>
      <SafeAreaView edges={['top']}>
        <View style={[styles.container, containerStyle]}>
          {leftView ? (
            <View
              style={[styles.leftView, leftViewStyle]}
              onLayout={onLayoutLeftView}
              accessibilityLabel={LABELS.panelHeaderLeftView}>
              {leftView}
            </View>
          ) : (
            <View style={{width: widthRightView}} />
          )}

          <View style={[styles.titleView, titleViewStyle]}>
            {titleView || (
              <View style={styles.defaultTitleView}>
                {title && (
                  <Typography
                    numberOfLines={1}
                    style={[styles.title, titleStyle]}
                    font={titleFont}>
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography
                    numberOfLines={1}
                    style={[styles.title, subtitleStyle]}
                    font={subtitleFont}>
                    {subtitle}
                  </Typography>
                )}
              </View>
            )}
          </View>

          {rightView ? (
            <View
              style={[styles.rightView, rightViewStyle]}
              onLayout={onLayoutRightView}
              accessibilityLabel={LABELS.panelHeaderRightView}>
              {rightView}
            </View>
          ) : (
            <View style={{width: widthLeftView}} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PanelHeader;

const createStyles = ({spaces}: IThemeContext) =>
  StyleSheet.create({
    commonView: {
      width: '100%',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: spaces.Space20,
      paddingVertical: spaces.Space10,
      height: rem(60),
    },
    leftView: {
      alignItems: 'flex-start',
      maxWidth: rem(96),
    },
    titleView: {
      flex: 2,
      paddingHorizontal: spaces.Space8,
    },
    rightView: {
      alignItems: 'flex-end',
      maxWidth: rem(96),
    },
    title: {
      textAlign: 'center',
    },
    defaultTitleView: {
      alignItems: 'center',
    },
  });
