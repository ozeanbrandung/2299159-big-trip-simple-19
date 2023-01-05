import {getRandomArrayElement, getRandomDate} from '../utils';
import getMockOffers from './offers';
import getMockDestinations from './destinations';
import {TYPES} from '../consts';

const mockPoints = [
  {
    id: '63b6cd0a9a2fa0141817fe45',
    basePrice: 8524,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: getRandomArrayElement(getMockDestinations()),
    type: getRandomArrayElement(TYPES),
    offers: [
      getRandomArrayElement(getMockOffers()),
    ]
  },
  {
    id: '63b6cd0a8cf50963bfadc1fb',
    basePrice: 8107,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date(2023, 3, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: getRandomArrayElement(TYPES),
    offers: [
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
    ]
  },
  {
    id: '63b6cd0a0160f9f579d2fcb1',
    basePrice: 9109,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: 'getRandomArrayElement(getMockDestionations())',
    type: 'getRandomArrayElement(TYPES)',
    offers: [
      getRandomArrayElement(getMockOffers()),
    ]
  },
  {
    id: '63b6cd0a7ea4444a2b9bbd4c',
    basePrice: 4123,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: getRandomArrayElement(getMockDestinations()),
    type: getRandomArrayElement(TYPES),
    offers: [
      getRandomArrayElement(getMockOffers()),
    ]
  },
  {
    id: '63b6cd0aef61439bdae815c2',
    basePrice: 2953,
    dateFrom: getRandomDate(new Date(2022, 12, 1), new Date()),
    dateTo: getRandomDate(new Date(), new Date(2023, 2, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: getRandomArrayElement(TYPES),
    offers: [
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
    ]
  },
  {
    id: '63b6cd0a152d881e7f1ac406',
    basePrice: 9772,
    dateFrom: getRandomDate(new Date(2022, 12, 1), new Date()),
    dateTo: getRandomDate(new Date(), new Date(2023, 2, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: getRandomArrayElement(TYPES),
    offers: [
      getRandomArrayElement(getMockOffers()),
      getRandomArrayElement(getMockOffers()),
    ]
  }
];

const getMockPoints = () => mockPoints;

export default getMockPoints;
