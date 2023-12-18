import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils.js';
import {
  START_ID_COUNTER,
  EVENT_TYPES,
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  MIN_OFFERS_COUNT,
  MAX_OFFERS_COUNT,
  OFFERS_TITLES
} from '../constants.js';

const getOfferId = createIdGenerator(START_ID_COUNTER);

const createOffer = () => {
  const ID = getOfferId();

  return {
    id: ID.toString(),
    title: getRandomArrayElement(OFFERS_TITLES),
    price: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE)
  };
};

const setupOffer = () => {
  const offersList = [];
  for (const type in EVENT_TYPES) {
    offersList.push({
      type: EVENT_TYPES[type],
      offers: Array.from({ length: getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)}, createOffer)
    });
  }
  return offersList;
};

const offers = setupOffer();

export { offers };
