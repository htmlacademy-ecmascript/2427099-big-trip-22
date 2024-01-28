const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { capitalizeFirstLetter, updateItem };
