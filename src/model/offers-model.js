import { offers } from '../mock/offers.js';

export default class OffersModel {
  #offers = [];

  constructor() {
    this.#offers = offers;
  }

  get() {
    return this.#offers;
  }

  getById(id) {
    return (
      this.#offers.find((offer) => offer.id === id.toString()) || null
    );
  }
}
