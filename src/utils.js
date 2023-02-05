import {escape} from 'he';
import dayjs from 'dayjs';

const DATE_FORMAT_SHORT = 'D MMM';

const TIME_FORMAT = 'HH:MM';

const DATE_FORMAT_LONG = 'DD/MM/YY';

/**
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 */

export const html = (strings, ...values) => strings.reduce((before, after, index) => {
  const value = values[index - 1];

  return before + escape(String(value)) + after;
});

/**
 * @param {string} value
 */
export const humanizeDate = (date) => dayjs(date).format(DATE_FORMAT_SHORT);

/**
 * @param {string} value
 */
export const humanizeTime = (time) => dayjs(time).format(TIME_FORMAT);

export const humanizeDateAndTime = (date) => `${dayjs(date).format(DATE_FORMAT_LONG)} ${dayjs(date).format(TIME_FORMAT)}`;

/**
 * @param {number} value
 */
export const formatNumber = (value) => value.toLocaleString('en');

/**
 * @param {Object} target
 * @param {*} value
 */
export const findKey = (target, value) => Object.keys(target).find((key) => target[key] === value);
