import {getRandomArrayElement, getRandomDate} from '../../utils';
import getMockDestinations from './destinations';

const mockPoints = [
  {
    id: '63b6cd0a9a2fa0141817fe45',
    basePrice: 8524,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'restaurant',
    offers: ['63b6ca9gh39c088d7b6464d8', '63b6ca8dc78fghf7d21bc121', '63b6ca8d8b2ff90a416d27be', '63bgh90d8b2ff90a416d27be']
  },
  {
    id: '63b6cd0a8cf50963bfadc1fb',
    basePrice: 8107,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date(2023, 3, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'sightseeing',
    offers: ['63b6ca8dfb92a6f51fd7da72']
  },
  {
    id: '63b6cd0a0160f9f579d2fcb1',
    basePrice: 9109,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'check-in',
    offers: []
  },
  {
    id: '63b6cd0a7ea4444a2b9bbd4c',
    basePrice: 4123,
    dateFrom: getRandomDate(new Date(2022, 7, 1), new Date()),
    dateTo: getRandomDate(new Date(2022, 7, 1), new Date()),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'flight',
    offers: []
  },
  {
    id: '63b6cd0aef61439bdae815c2',
    basePrice: 2953,
    dateFrom: getRandomDate(new Date(2022, 12, 1), new Date()),
    dateTo: getRandomDate(new Date(), new Date(2023, 2, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'drive',
    offers: ['63b6ca8d8b2edd51416d27be', '63b6ca8d7f9c088d7b6464d8']
  },
  {
    id: '63b6cd0a152d881e7f1ac406',
    basePrice: 9772,
    dateFrom: getRandomDate(new Date(2022, 12, 1), new Date()),
    dateTo: getRandomDate(new Date(), new Date(2023, 2, 1)),
    destination: getRandomArrayElement(getMockDestinations()),
    type: 'taxi',
    offers: ['63b6ca8d4058cdc426f32428']
  }
];

function getAllMockPoints () {
  return mockPoints;
}

function getRandomMockPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getAllMockPoints, getRandomMockPoint};
