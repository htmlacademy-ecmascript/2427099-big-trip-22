import { getRandomInteger } from '../utils/common.js';
import {
  PriceValue,
  Time
} from '../constants.js';

const getRandomDate = () => {
  const currentDate = new Date();
  const minutesToAdd = getRandomInteger(Time.MIN_MINUTES, Time.MAX_MINUTES);
  currentDate.setMinutes(currentDate.getMinutes() + minutesToAdd);
  return currentDate.toISOString();
};

const createEventPoint = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(PriceValue.MIN, PriceValue.MAX),
  dateFrom: new Date().toISOString(),
  dateTo: getRandomDate(),
  destination: destinationId,
  isFavorite: Math.random() > 0.5,
  offers: offerIds,
  type
});

export { createEventPoint };
