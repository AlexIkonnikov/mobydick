import {createStyles, useStyles, View, Calendar} from 'shared/ui';
import Header from 'shared/ui/Header';

export const CalendarWidget = () => {
  const [styles] = useStyles(stylesFn);

  return (
    <View style={styles.container}>
      <Header title={'Calendar'} />
      <Calendar />
    </View>
  );
};

const stylesFn = createStyles(({spaces}) => ({
  container: {
    gap: spaces.Space16,
    alignItems: 'center',
  },
}));