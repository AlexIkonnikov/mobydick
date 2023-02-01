import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  Calendar as DefaultCalendar,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import {useStyles, useTheme, rem} from '@npm/mobydick-core';

import {localeConfigRu} from './localeConfig';
import {
  calculateBoundaries,
  calculateYearRange,
  getAllDatesBetween,
} from './functions';
import stylesCreate from './stylesCreate';
import {ICalendar, IDirection, IMarkedDates, ISelectionState} from './types';
import CalendarHeader from './components/CalendarHeader';
import Years from './components/Years';
import Months from './components/Months';

const Calendar: FC<ICalendar> = props => {
  const {
    onDateRangeChange,
    defaultLocale = 'ru',
    bottomView,
    isClear,
    isShowToday = true,
    localeConfig = localeConfigRu,
    isPeriod = false,
    ...rest
  } = props;
  LocaleConfig.locales[defaultLocale] = localeConfig;
  LocaleConfig.defaultLocale = defaultLocale;

  const {colors, currentTheme} = useTheme();
  const today = new Date();
  const [styles] = useStyles(stylesCreate);

  const colorsArg = useMemo(
    () => ({
      colorPrime: {
        color: colors.ElementBase,
        textColor: colors.TextWhite,
      },
      colorSoft: {
        color: colors.BgAccent,
        textColor: colors.TextPrimary,
      },
    }),
    [],
  );

  const [markedDates, setMarkedDates] = useState<IMarkedDates>();
  const [selectionState, setSelectionState] = useState<ISelectionState>(
    ISelectionState.days,
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    today.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [yearRange, setYearRange] = useState<number[]>(
    calculateYearRange(currentYear),
  );

  const todayTimeMidnight = new Date(
    today.getTime() - (today.getTime() % (1000 * 60 * 60 * 24)),
  ); // сбрасываем timestamp этого дня до 00:00:00

  const themeStyles = useMemo(
    () => ({
      theme: {
        calendarBackground: colors.BgPrimary,
        textSectionTitleColor: colors.TextTertiary,
        dayTextColor: colors.TextPrimary,
        textDisabledColor: colors.TextMuted,
        arrowColor: colors.IconNeutral,
        monthTextColor: colors.TextPrimary,
        textMonthFontFamily: 'Inter-Medium',
        textDayHeaderFontFamily: 'Inter-Medium',
        textMonthFontSize: rem(14),
        textDayHeaderFontSize: rem(14),
        textDayFontSize: rem(14),
        textDayFontFamily: 'Inter-Regular',
        weekVerticalMargin: 0,
      },
    }),
    [currentTheme],
  );

  const onDayPress = useCallback(
    (day: DateData) => {
      const {fromDate, toDate} = calculateBoundaries(
        day,
        markedDates,
        isPeriod,
      );

      setCurrentYear(day.year);
      setCurrentMonthIndex(day.month - 1);

      setMarkedDates(
        getAllDatesBetween(new Date(fromDate), new Date(toDate), colorsArg),
      );
      onDateRangeChange &&
        onDateRangeChange({
          dateStart: new Date(fromDate).toISOString(),
          dateEnd: new Date(toDate).toISOString(),
        });
    },
    [
      markedDates,
      isPeriod,
      colorsArg,
      onDateRangeChange,
      currentYear,
      currentMonthIndex,
    ],
  );

  const markedToday = () => {
    setMarkedDates(
      getAllDatesBetween(
        new Date(todayTimeMidnight),
        new Date(todayTimeMidnight),
        colorsArg,
      ),
    );
  };
  const onClear = () => {
    onDateRangeChange && onDateRangeChange({dateStart: '', dateEnd: ''});
    isShowToday ? markedToday() : setMarkedDates(undefined);
  };

  useLayoutEffect(() => {
    if (isShowToday) {
      markedToday();
    }
  }, []);

  useEffect(() => {
    if (isClear) {
      onClear();
    }
  }, [isClear]);

  const onPressMonth = useCallback(monthIndex => {
    setCurrentMonthIndex(monthIndex);
    setSelectionState(ISelectionState.days);
  }, []);

  const onCloseMonths = useCallback(
    () => setSelectionState(ISelectionState.days),
    [],
  );

  const onPressYear = useCallback(year => {
    setCurrentYear(year);
    setSelectionState(ISelectionState.months);
  }, []);

  const onCloseYears = useCallback(
    () => setSelectionState(ISelectionState.months),
    [],
  );

  const onPressCurrMonth = useCallback(() => {
    if (selectionState === ISelectionState.days) {
      setSelectionState(ISelectionState.months);
    } else if (selectionState === ISelectionState.months) {
      setSelectionState(ISelectionState.years);
    } else if (selectionState === ISelectionState.years) {
      setSelectionState(ISelectionState.months);
    }
  }, [selectionState]);

  const onPressLeft = useCallback(() => {
    if (selectionState === ISelectionState.days) {
      if (currentMonthIndex) {
        setCurrentMonthIndex(currentMonthIndex - 1);
      } else {
        setCurrentMonthIndex(11);
        setCurrentYear(currentYear - 1);
      }
    } else if (selectionState === ISelectionState.months) {
      setCurrentYear(currentYear - 1);
    } else if (selectionState === ISelectionState.years) {
      yearRange[0] &&
        setYearRange(calculateYearRange(yearRange[0], IDirection.left));
    }
  }, [currentMonthIndex, currentYear, yearRange, selectionState]);

  const onPressRight = useCallback(() => {
    if (selectionState === ISelectionState.days) {
      if (currentMonthIndex + 1 < 12) {
        setCurrentMonthIndex(currentMonthIndex + 1);
      } else {
        setCurrentMonthIndex(0);
        setCurrentYear(currentYear + 1);
      }
    } else if (selectionState === ISelectionState.months) {
      setCurrentYear(currentYear + 1);
    } else if (selectionState === ISelectionState.years) {
      const lastYear = yearRange[yearRange?.length - 1];
      lastYear && setYearRange(calculateYearRange(lastYear, IDirection.right));
    }
  }, [currentMonthIndex, yearRange, currentYear, selectionState]);

  const getCalenderTitle = () => {
    if (selectionState === ISelectionState.months) {
      return currentYear.toString();
    } else if (selectionState === ISelectionState.years) {
      return (
        yearRange[0]?.toString() +
        '-' +
        yearRange[yearRange.length - 1]?.toString()
      );
    }
    return localeConfig.monthNames[currentMonthIndex] + ', ' + currentYear;
  };

  return (
    <>
      <CalendarHeader
        title={getCalenderTitle()}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        onPress={onPressCurrMonth}
      />
      {selectionState === ISelectionState.days && (
        <DefaultCalendar
          firstDay={1}
          style={styles.daysView}
          markingType={'period'}
          markedDates={markedDates?.dates || {}}
          onDayPress={onDayPress}
          onDayLongPress={onDayPress}
          theme={themeStyles.theme}
          initialDate={currentYear + '-' + (currentMonthIndex + 1)}
          customHeaderTitle={<></>}
          hideArrows={true}
          {...rest}
        />
      )}
      {selectionState === ISelectionState.months && (
        <Months
          onCloseMonths={onCloseMonths}
          onPressMonth={onPressMonth}
          monthNamesShort={localeConfig.monthNamesShort}
        />
      )}
      {selectionState === ISelectionState.years && (
        <Years
          onCloseYears={onCloseYears}
          onPressYear={onPressYear}
          yearRange={yearRange}
        />
      )}

      {bottomView}
    </>
  );
};

export default Calendar;
