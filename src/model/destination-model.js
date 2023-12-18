import { getDestinations } from '../mock/destinations.js';

export default class DestinationModel {
  #destinations = [];

  constructor() {
    this.#destinations = getDestinations();
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id.toString()) || null
    );
  }
}
