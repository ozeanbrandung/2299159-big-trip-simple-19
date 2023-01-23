import {escape} from 'he';
import dayjs from 'dayjs';
import {DATE_FORMAT_LONG, DATE_FORMAT_SHORT, TIME_FORMAT} from './personal/consts';

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

/**
 * @param {string} value
 */
export const humanizeDate = (date) => dayjs(date).format(DATE_FORMAT_SHORT);

/**
 * @param {string} value
 */
export const humanizeTime = (time) => dayjs(time).format(TIME_FORMAT);

export const humanizeDateAndTime = (date) => `${dayjs(date).format(DATE_FORMAT_LONG)} ${dayjs(date).format(TIME_FORMAT)}`;

//отображение чисел в разных языках отличается так что нужно приводить к одному формату если работаешь с несколькими языками
/**
 * @param {number} value
 */
export const formatNumber = (value) => value.toLocaleString('en');

/**
 * @param {Object} target
 * @param {*} value
 */
export const findKey = (target, value) => Object.keys(target).find((key) => target[key] === value);
