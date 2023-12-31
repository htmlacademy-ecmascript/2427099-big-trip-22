const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { capitalizeFirstLetter, getRandomInteger, getRandomArrayElement, updateItem };
