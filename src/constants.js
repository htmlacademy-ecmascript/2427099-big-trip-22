const ImageCount = {
  MIN: 0,
  MAX: 6
};

const OffersCount = {
  MIN: 0,
  MAX: 3
};

const PriceValue = {
  MIN: 10,
  MAX: 1000
};

const Time = {
  MIN_MINUTES: 1,
  MAX_MINUTES: 2440,
  MINUTES_PER_DAY: 1440,
  MINUTES_PER_HOUR: 60
};

const DateTimeFormat = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  DATE_TIME_FORMAT: 'DD/MM/YY HH:mm'
};

const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.'
];

const CITIES = ['Paris', 'Moscow', 'London', 'Tokio', 'New York', 'Berlin', 'Amsterdam', 'San-Francisco', 'Chicago', 'Toronto'];

const OFFERS_TITLES = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const enabledSortType = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFERS]: false
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  ADDITING: 'ADDITING'
};

const EMPTY_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PRESENT]: 'There are no present points now',
  [FilterType.PAST]: 'There are no past points now',
};

export {
  EVENT_TYPES,
  DESCRIPTIONS,
  CITIES,
  ImageCount,
  OffersCount,
  PriceValue,
  Time,
  OFFERS_TITLES,
  DateTimeFormat,
  SortTypes,
  enabledSortType,
  FilterType,
  Mode,
  EMPTY_POINT,
  UserAction,
  UpdateType,
  NoPointsTextType
};
