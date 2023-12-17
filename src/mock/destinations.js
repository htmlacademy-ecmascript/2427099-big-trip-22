import { createIdGenerator, getRandomArrayElement, getRandomInteger } from '../utils.js';
import { START_ID_COUNTER, DESCRIPTIONS, CITIES, MIN_IMAGES_COUNT, MAX_IMAGES_COUNT } from '../constants.js';

const getDistinationId = createIdGenerator(START_ID_COUNTER);
const getPictureNumber = createIdGenerator(START_ID_COUNTER);

const createDestinationPicture = () => {
  const pictureId = getPictureNumber();

  return {
    src: `https://loremflickr.com/248/152?random=${pictureId}`,
    description: getRandomArrayElement(DESCRIPTIONS)
  };
};

const createDestination = () => {
  const ID = getDistinationId();

  return {
    id: ID.toString(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: CITIES[ID - 1],
    pictures: Array.from({ length: getRandomInteger(MIN_IMAGES_COUNT, MAX_IMAGES_COUNT) }, createDestinationPicture)
  };
};

const getDestinations = () => Array.from({ length: CITIES.length }, createDestination);

export { getDestinations };
