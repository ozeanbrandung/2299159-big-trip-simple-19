const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '63b6ca8d652744d8aca2f9bb',
        title: 'in tempor proident',
        price: 238
      },
      {
        id: '63b6ca8d4058cdc426f32428',
        title: 'proident commodo sunt',
        price: 202
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '63b6ca8db8ca8a0a4f5a2bc1',
        title: 'nostrud fugiat Lorem',
        price: 189
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '63b6ca8d4a557f9271ea15f1',
        title: 'id sint duis',
        price: 160
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '63b6ca8d76ffe15448d07106',
        title: 'minim eu aute',
        price: 196
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '63b6ca8d7f9c088d7b6464d8',
        title: 'veniam officia sint',
        price: 134
      },
      {
        id: '63b6ca8dc2d3b3f7d21bc121',
        title: 'excepteur est et',
        price: 222
      },
      {
        id: '63b6ca8d8b2edd51416d27be',
        title: 'duis ullamco reprehenderit',
        price: 270
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: '63b6ca8dfb92a6f51fd7da72',
        title: 'elit ex magna',
        price: 213
      }
    ]
  },
  {
    type: 'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '63b6ca8dfb92a6f51fd7da72',
        title: 'elit ex magna',
        price: 213
      },
      {
        id: '63b6ca9d23afd15dae909d90',
        title: 'culpa aliqua',
        price: 144
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '63b6ca9gh39c088d7b6464d8',
        title: 'Valensia',
        price: 134
      },
      {
        id: '63b6ca8dc78fghf7d21bc121',
        title: 'Requiem for a dream',
        price: 200
      },
      {
        id: '63b6ca8d8b2ff90a416d27be',
        title: 'Titanic',
        price: 274
      },
      {
        id: '63bgh90d8b2ff90a416d27be',
        title: 'Lofi',
        price: 274
      }
    ]
  }
];

const getMockOffersByType = (type) => mockOffers.find((offerInfo) => offerInfo.type === type).offers;

export {getMockOffersByType};
