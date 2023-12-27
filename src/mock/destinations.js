import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { DESCRIPTIONS, CITIES, ImageCount } from '../constants.js';

const createDestinationPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

const createDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: city,
    pictures: Array.from({ length: getRandomInteger(ImageCount.MIN, ImageCount.MAX) }, createDestinationPicture)
  };
};

export { createDestination };
