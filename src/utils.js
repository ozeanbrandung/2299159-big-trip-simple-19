import {escape} from 'he';
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
import {DATE_FORMAT, DATE_FORMAT_SHORT, TIME_FORMAT} from './consts';

/**
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 */

export const html = (strings, ...values) => strings.reduce((before, after, index) => {
  const value = values[index - 1];

  return before + escape(String(value)) + after;
});

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const humanizeDate = (date) => dayjs(date).format(DATE_FORMAT_SHORT);

export const humanizeTime = (time) => dayjs(time).format(TIME_FORMAT);
