import { createDestination } from '../mock/destinations.js';
import { createOffer } from '../mock/offers.js';
import { createEventPoint } from '../mock/event-points.js';
import { EVENT_TYPES, CITIES, MIN_OFFERS_COUNT, MAX_OFFERS_COUNT } from '../constants.js';
import { getRandomArrayElement, getRandomInteger } from '../utils.js';

export default class MockService {
  destinations = [];
  offers = [];
  eventPoints = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.eventPoints = this.generateEventPoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getEventPoints() {
    return this.eventPoints;
  }

  generateDestinations() {
    return Array.from({ length: CITIES.length }, createDestination);
  }

  generateOffers() {
    return EVENT_TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)}, createOffer)
    }));
  }

  generateEventPoints() {
    return Array.from({ length: EVENT_TYPES.length }, () => {
      const type = getRandomArrayElement(EVENT_TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const offersByType = this.offers.find((offer) => offer.type === type);

      const randomOffers = new Set();

      Array.from({ length: getRandomInteger(1, offersByType.offers.length) }, () => {
        randomOffers.add(getRandomArrayElement(offersByType.offers));
      });

      const hasOffers = (randomOffers.size > 0 && [...randomOffers][0]);
      const offerIds = hasOffers ? [...randomOffers].map((offer) => offer.id) : [];

      return createEventPoint(type, destination.id, offerIds);
    });
  }
}
