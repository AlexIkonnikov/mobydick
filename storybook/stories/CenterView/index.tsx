import React, {FC} from 'react';
import {View} from '@npm/mobydick-core';
import {Button, ITypes} from '@npm/mobydick-cta';
import {ThemeProvider, useStyles, useTheme} from '@npm/mobydick-styles';

import styleCreate from './style';

const Wrapper: FC = ({children}) => {
  const {currentTheme, setCurrentTheme} = useTheme();
  const [styles] = useStyles(styleCreate);

  return (
    <View style={styles.main}>
      {children}
      <Button
        style={styles.themeSwitcher}
        type={ITypes.tertiary}
        text={currentTheme}
        onPress={() => {
          setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
        }}
      />
    </View>
  );
};
export default function CenterView({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
}
