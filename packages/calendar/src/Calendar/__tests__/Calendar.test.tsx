import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import Calendar from '../Calendar';
import {LABELS} from '../constants';

describe('Calendar', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2022-07-15'));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const {toJSON} = render(<Calendar />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('press calendarLeftArrow', () => {
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarLeftArrow = getByLabelText(LABELS.calendarLeftArrow);

    fireEvent.press(calendarLeftArrow);
    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarLeftArrow 01 -> 12', () => {
    jest.setSystemTime(new Date('2022-01-15'));
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarLeftArrow = getByLabelText(LABELS.calendarLeftArrow);

    fireEvent.press(calendarLeftArrow);
    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarPressTitle * 2 calendarLeftArrow', () => {
    const {toJSON, getByLabelText, getAllByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarPressTitleMonth = getByLabelText(
      LABELS.calendarPressTitleMonth,
    );
    fireEvent.press(calendarPressTitleMonth); //months

    const calendarPressTitleYear = getByLabelText(
      LABELS.calendarPressTitleYear,
    );
    const calendarLeftArrow = getByLabelText(LABELS.calendarLeftArrow);
    fireEvent.press(calendarLeftArrow);

    fireEvent.press(calendarPressTitleYear); //years
    fireEvent.press(calendarLeftArrow);

    const pressYear = getAllByLabelText(LABELS.pressYear)[2];
    pressYear && fireEvent.press(pressYear);

    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarPressTitle * 3 calendarLeftArrow', () => {
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarPressTitleMonth = getByLabelText(
      LABELS.calendarPressTitleMonth,
    );
    fireEvent.press(calendarPressTitleMonth); //months

    const calendarPressTitleYear = getByLabelText(
      LABELS.calendarPressTitleYear,
    );
    const calendarLeftArrow = getByLabelText(LABELS.calendarLeftArrow);
    fireEvent.press(calendarLeftArrow);

    fireEvent.press(calendarPressTitleYear); //years
    fireEvent.press(calendarLeftArrow);

    fireEvent.press(calendarPressTitleYear); //range years
    fireEvent.press(calendarLeftArrow);
    expect(toJSON()).toMatchSnapshot();
  });

  it('press calendarRightArrow', () => {
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarRightArrow = getByLabelText(LABELS.calendarRightArrow);

    fireEvent.press(calendarRightArrow);
    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarRightArrow 12 -> 1', () => {
    jest.setSystemTime(new Date('2022-12-15'));
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarRightArrow = getByLabelText(LABELS.calendarRightArrow);

    fireEvent.press(calendarRightArrow);
    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarPressTitle calendarRightArrow', () => {
    const {toJSON, getByLabelText, getAllByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarPressTitleMonth = getByLabelText(
      LABELS.calendarPressTitleMonth,
    );
    fireEvent.press(calendarPressTitleMonth); //months

    const calendarPressTitleYear = getByLabelText(
      LABELS.calendarPressTitleYear,
    );
    const calendarRightArrow = getByLabelText(LABELS.calendarRightArrow);
    fireEvent.press(calendarRightArrow);

    const pressMonth = getAllByLabelText(LABELS.pressMonth)[5];
    pressMonth && fireEvent.press(pressMonth);

    fireEvent.press(calendarPressTitleYear); // years
    fireEvent.press(calendarPressTitleYear); // range years

    fireEvent.press(calendarRightArrow);

    expect(toJSON()).toMatchSnapshot();
  });

  it('press calendarPressTitle*2 calendarRightArrow', () => {
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarPressTitleMonth = getByLabelText(
      LABELS.calendarPressTitleMonth,
    );
    fireEvent.press(calendarPressTitleMonth); //months

    const calendarPressTitleYear = getByLabelText(
      LABELS.calendarPressTitleYear,
    );

    const calendarRightArrow = getByLabelText(LABELS.calendarRightArrow);
    fireEvent.press(calendarRightArrow);

    fireEvent.press(calendarPressTitleYear); //years

    fireEvent.press(calendarRightArrow);

    fireEvent.press(calendarPressTitleYear); //range years

    fireEvent.press(calendarRightArrow);
    expect(toJSON()).toMatchSnapshot();
  });
  it('press calendarPressTitleYear', () => {
    const {toJSON, getByLabelText} = render(
      <Calendar onDateRangeChange={() => undefined} isShowToday={false} />,
    );
    const calendarPressTitleYear = getByLabelText(
      LABELS.calendarPressTitleYear,
    );
    fireEvent.press(calendarPressTitleYear); // years
    fireEvent.press(calendarPressTitleYear); // range years
    expect(toJSON()).toMatchSnapshot();
  });
});
