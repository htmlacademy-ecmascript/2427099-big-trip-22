import { getRandomInteger } from '../utils.js';
import {
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  MIN_MINUTES,
  MAX_MINUTES
} from '../constants.js';

const getRandomDate = () => {
  const currentDate = new Date();
  const minutesToAdd = getRandomInteger(MIN_MINUTES, MAX_MINUTES);
  currentDate.setMinutes(currentDate.getMinutes() + minutesToAdd);
  return currentDate.toISOString();
};

const createEventPoint = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
  dateFrom: new Date().toISOString(),
  dateTo: getRandomDate(),
  destination: destinationId,
  isFavorite: Math.random() > 0.5,
  offers: offerIds,
  type
});

export { createEventPoint };
