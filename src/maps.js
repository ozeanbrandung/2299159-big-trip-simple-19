import {FilterType, PointType, SortType} from './enums';

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

export const pointTitleMap = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECK_IN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant'
};

// export const pointIconsMap = Object.fromEntries(
//   Object.entries(PointType).map(
//     ([key, value]) => [value, `img/icons/${value}.png`]
//   )
// );

export const pointIconsMap = Object.fromEntries(
  Object.values(PointType).map(
    (value) => [value, `img/icons/${value}.png`]
  )
);
