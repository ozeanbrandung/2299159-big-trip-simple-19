import {FilterType, SortType} from './enums';

/**
 * @type {Record<string,FilterCallback<PointAdapter>>}
 */
export const filterCallbackMap = {
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (item) => item.endDateAsNumber > Date.now(),
};
//если коллбэки для фильтрации возвращают true, значит ничо не фильтруется

/**
 * @type {Record<string,SortCallback<PointAdapter>>}
 */
export const sortCallbackMap = {
  [SortType.DAY]: (current, next) => current.startDateAsNumber - next.startDateAsNumber,
  [SortType.EVENT]: () => 0,
  [SortType.TIME]: () => 0,
  [SortType.PRICE]: (current, next) => current.basePrice - next.basePrice,
  [SortType.OFFERS]: () => 0
};
//если коллбэки для сортировки возвращают 0, значит ничо не сортируется
