import AbstractView from '../framework/view/abstract-view.js';

function createTripMainContainerView() {
  return (
    `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>
    `
  );
}

export default class TripMainContainerView extends AbstractView {
  get template() {
    return createTripMainContainerView();
  }
}
