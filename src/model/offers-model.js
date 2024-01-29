export default class OffersModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return (
      this.offers.find((offer) => offer.type === type).offers
    );
  }

  async init() {
    try {
      this.#offers = await this.#service.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}
