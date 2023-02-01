import rem from '@npm/mobydick-core/src/styles/spaces/rem';
import {DateData} from 'react-native-calendars';

import {IColors, IDirection, IMarkedDates, IMarkedTypes} from './types';

export const getDateForCalendar = (date: Date): string => {
  const yr = date.getFullYear();
  const month = `${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}`;
  const d = `${date.getDate() < 10 ? 0 : ''}${date.getDate()}`;
  return `${yr}-${month}-${d}`;
};

export const getAllDatesBetween = (
  fromDate: Date,
  toDate: Date,
  {colorPrime, colorSoft, colorToday}: IColors,
  isShowToday: boolean,
) => {
  let curDate = new Date(fromDate.getTime());
  const datesForCalendar: IMarkedTypes = {};

  if (isShowToday) {
    datesForCalendar[getDateForCalendar(new Date())] = {
      startingDay: true,
      endingDay: true,

      color: colorToday.color,
      textColor: colorToday.textColor,

      customContainerStyle: {
        borderRadius: rem(4),
        width: '100%',
      },
      customTextStyle: {
        fontWeight: '600',
      },
    };
  }
  datesForCalendar[getDateForCalendar(fromDate)] = {
    startingDay: true,
    endingDay: true,

    color: colorPrime.color,
    textColor: colorPrime.textColor,

    customContainerStyle: {
      borderRadius: rem(4),
      width: '100%',
    },
  };

  while (curDate < toDate) {
    curDate = new Date(curDate.setDate(curDate.getDate() + 1));
    datesForCalendar[getDateForCalendar(curDate)] = {
      color: colorSoft.color,
      textColor: colorSoft.textColor,
    };
  }
  datesForCalendar[getDateForCalendar(toDate)] = {
    startingDay: true,
    endingDay: true,
    textColor: colorPrime.textColor,
    color: colorPrime.color,

    customContainerStyle: {
      borderRadius: rem(4),
      width: '100%',
    },
  };
  return {dates: datesForCalendar, fromDate, toDate};
};

export const getMarkedToday = ({colorToday}: IColors) => {
  const datesForCalendar: IMarkedTypes = {};
  datesForCalendar[getDateForCalendar(new Date())] = {
    startingDay: true,
    endingDay: true,

    color: colorToday.color,
    textColor: colorToday.textColor,

    customContainerStyle: {
      borderRadius: rem(4),

      width: '100%',
    },
    customTextStyle: {
      fontWeight: '600',
    },
  };

  return {dates: datesForCalendar, fromDate: null, toDate: null};
};

export const calculateBoundaries = (
  day: DateData,
  markedDates: IMarkedDates | undefined,
  isPeriod: boolean,
) => {
  let toDate;
  let fromDate;

  if (
    !markedDates ||
    !isPeriod ||
    !markedDates.fromDate ||
    !markedDates.toDate
  ) {
    fromDate = day.timestamp;
    toDate = day.timestamp;
  } else {
    const {fromDate: minDate, toDate: maxDate} = markedDates;

    if (day.timestamp < minDate.getTime()) {
      fromDate = day.timestamp;
      toDate = maxDate;
    } else if (day.timestamp > maxDate.getTime()) {
      toDate = day.timestamp;
      fromDate = minDate;
    } else if (
      day.timestamp === minDate.getTime() ||
      day.timestamp === maxDate.getTime()
    ) {
      fromDate = day.timestamp;
      toDate = day.timestamp;
    } else {
      fromDate = minDate;
      toDate = day.timestamp;
    }
  }
  return {fromDate, toDate};
};

export const calculateYearRange = (
  currentYear: number,
  direction?: IDirection,
) => {
  const yearRange = [];

  switch (direction) {
    case IDirection.left: {
      for (let i = 16; i > 0; i--) {
        yearRange.push(currentYear - i);
      }
      break;
    }

    case IDirection.right: {
      for (let i = 1; i <= 16; i++) {
        yearRange.push(currentYear + i);
      }
      break;
    }
    default: {
      for (let i = 15; i >= 0; i--) {
        yearRange.push(currentYear - i);
      }
      break;
    }
  }

  return yearRange;
};
