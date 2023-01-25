import rem from '@npm/mobydick-core/src/styles/spaces/rem';
import {DateData} from 'react-native-calendars';

import {IColors, IMarkedDates, IMarkedTypes} from './types';

export const getDateForCalendar = (date: Date): string => {
  const yr = date.getFullYear();
  const month = `${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}`;
  const d = `${date.getDate() < 10 ? 0 : ''}${date.getDate()}`;
  return `${yr}-${month}-${d}`;
};

export const getAllDatesBetween = (
  fromDate: Date,
  toDate: Date,
  {colorPrime, colorSoft}: IColors,
) => {
  let curDate = new Date(fromDate.getTime());
  const datesForCalendar: IMarkedTypes = {};
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

export const calculateBoundaries = (
  day: DateData,
  markedDates: IMarkedDates | undefined,
  periodOff: boolean,
) => {
  let toDate;
  let fromDate;

  if (!markedDates || periodOff) {
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
