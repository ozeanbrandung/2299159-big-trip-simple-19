/**
 * @template Item
 * @typedef {import('./store').default<Item>} Store
 */

/**
 * @typedef Point
 * @prop {number} base_price
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} destination
 * @prop {string} id
 * @prop {number[]} offers
 * @prop {string} type
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Picture[]} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef {import('./adapters/adapter').default} Adapter
 * @typedef {import('./adapters/point-adapter').default} PointAdapter
 * @typedef {import('./adapters/destination-adapter').default} DestinationAdapter
 * @typedef {import('./adapters/offer-group-adapter').default} OfferGroupAdapter
 */

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @callback AdaptCallback
 * @param {Item} [item]
 * @return {ItemAdapter}
 */

/**
 * @template Item
 * @callback FilterCallback
 * @param {Item} item
 * @return {boolean}
 */

/**
 * @template Item
 * @callback SortCallback
 * @param {Item} item
 * @param {Item} nextItem
 * @return {number}
 */

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @typedef {import('./models/collection-model').default<Item,ItemAdapter>} CollectionModel
 */

/**
 * @typedef PointViewState
 * @prop {string} date
 * @prop {string} icon
 * @prop {string} title
 * @prop {string} startTime
 * @prop {string} startDate
 * @prop {string} endTime
 * @prop {string} endDate
 * @prop {string} basePrice
 * @prop {OfferViewState[]} offers
 */

/**
 * @typedef OfferViewState
 * @prop {string} title
 * @prop {string} price
 */

/**
 * @typedef {import('./views/list-view').default} ListView
 * @typedef {import('./views/filter-view').default} FilterView
 * @typedef {import('./views/sort-view').default} SortView
 * @typedef {import('./views/new-point-editor-view').default} NewPointEditorView
 */

/**
 * @typedef OptionViewState
 * @prop {string} title
 * @prop {string} value
 */

/**
 * @typedef OfferToggleViewState
 * @prop {string} id
 * @prop {string} title
 * @prop {string} price
 * @prop {boolean} checked
 */

/**
 * @typedef {import('flatpickr/dist/types/instance').Instance} Calendar
 * @typedef {import('flatpickr/dist/types/options').Options} CalendarConfig
 */

