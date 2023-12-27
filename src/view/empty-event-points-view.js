import AbstractView from '../framework/view/abstract-view';

function createEmptyEventPointsTemplate() {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EmptyEventPointsView extends AbstractView {
  get template() {
    return createEmptyEventPointsTemplate();
  }
}
