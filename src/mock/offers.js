import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import {
  PriceValue,
  OFFERS_TITLES
} from '../constants.js';

const createOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomInteger(PriceValue.MIN, PriceValue.MAX)
});

export { createOffer };
