import AbstractView from '../framework/view/abstract-view.js';
import { humanizeHeaderEventDate } from '../utils/event.js';

function createTripHeaderInfoTemplate(tripRoute, eventDate, totalPrice) {
  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>

        <p class="trip-info__dates">${humanizeHeaderEventDate(eventDate.startDate)}&nbsp;&mdash;&nbsp;${humanizeHeaderEventDate(eventDate.endDate)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
}

export default class TripHeaderInfoView extends AbstractView {
  #eventDate = {};
  #totalPrice = 0;
  #tripRoute = '';

  constructor({tripRoute, eventDate, totalPrice}) {
    super();
    this.#tripRoute = tripRoute;
    this.#eventDate = eventDate;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripHeaderInfoTemplate(this.#tripRoute, this.#eventDate, this.#totalPrice);
  }
}
