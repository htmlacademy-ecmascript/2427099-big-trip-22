import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils.js';
import {
  START_ID_COUNTER,
  CITIES, EVENT_TYPES,
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  MIN_MINUTES,
  MAX_MINUTES
} from '../constants.js';

const getEventPointId = createIdGenerator(START_ID_COUNTER);

const getRandomDate = () => {
  const currentDate = new Date();
  const minutesToAdd = getRandomInteger(MIN_MINUTES, MAX_MINUTES);
  currentDate.setMinutes(currentDate.getMinutes() + minutesToAdd);
  return currentDate.toISOString();
};

const createEventPoint = () => {
  const ID = getEventPointId();

  return {
    id: ID.toString(),
    basePrice: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
    dateFrom: new Date().toISOString(),
    dateTo: getRandomDate(),
    destination: getRandomInteger(1, CITIES.length).toString(),
    isFavorite: Math.random() > 0.5,
    offers: [
      '1',
      '2',
    ],
    type: getRandomArrayElement(EVENT_TYPES)
  };
};

const getEventPoints = () => Array.from({ length: EVENT_TYPES.length }, createEventPoint);

export { getEventPoints };
