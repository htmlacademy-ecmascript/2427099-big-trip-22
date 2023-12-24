import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DESCRIPTIONS, CITIES, MIN_IMAGES_COUNT, MAX_IMAGES_COUNT } from '../constants.js';

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
    pictures: Array.from({ length: getRandomInteger(MIN_IMAGES_COUNT, MAX_IMAGES_COUNT) }, createDestinationPicture)
  };
};

export { createDestination };
