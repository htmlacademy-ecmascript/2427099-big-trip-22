const START_ID_COUNTER = 0;
const MIN_IMAGES_COUNT = 0;
const MAX_IMAGES_COUNT = 6;
const MIN_OFFERS_COUNT = 0;
const MAX_OFFERS_COUNT = 3;
const MIN_PRICE_VALUE = 10;
const MAX_PRICE_VALUE = 1000;
const MIN_MINUTES = 1;
const MAX_MINUTES = 80;
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const EVENT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
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
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

export {
  START_ID_COUNTER,
  EVENT_TYPES,
  DESCRIPTIONS,
  CITIES,
  MIN_IMAGES_COUNT,
  MAX_IMAGES_COUNT,
  MIN_OFFERS_COUNT,
  MAX_OFFERS_COUNT,
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
  OFFERS_TITLES,
  MIN_MINUTES,
  MAX_MINUTES,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT
};
