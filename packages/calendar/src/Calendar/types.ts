import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking';
import {CalendarProps} from 'react-native-calendars';
import {ReactElement} from 'react';

export interface IMarkedTypes {
  [key: string]: MarkingProps;
}

export interface IMarkedDates {
  dates: IMarkedTypes;
  fromDate: Date;
  toDate: Date;
}
export type colorElem = {
  color: string;
  textColor: string;
};

export type IColors = {
  colorPrime: colorElem;
  colorSoft: colorElem;
};

export interface IRangeDate {
  dateStart: string;
  dateEnd: string;
}

export enum IButtonView {
  small = 'small',
  large = 'large',
}

export interface ICalendar extends CalendarProps {
  onChangeDate?: (dateRange: IRangeDate) => void;
  bottomView?: ReactElement;
  defaultLocale?: string;
  isClear?: boolean;
  isShowToday?: boolean;
  localeConfig?: ILocaleConfig | undefined;
  periodOff?: boolean;
}

export interface ILocaleConfig {
  monthNames: string[];
  monthNamesShort: string[];
  dayNames: string[];
  dayNamesShort: string[];
  today?: string;
}
