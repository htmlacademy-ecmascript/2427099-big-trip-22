import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import {
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  OFFERS_TITLES
} from '../constants.js';

const createOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE)
});

export { createOffer };
