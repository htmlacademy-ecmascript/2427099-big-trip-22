export default class DestinationModel {
  #service = null;
  #destinations = [];

  constructor(service) {
    this.#service = service;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return (
      this.#destinations.find((destination) => destination.id === id)
    );
  }

  async init() {
    try {
      this.#destinations = await this.#service.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }
}
