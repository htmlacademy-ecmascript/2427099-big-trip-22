import AbstractView from '../framework/view/abstract-view';
import { NoPointsTextType } from '../constants';

function createEmptyEventPointsTemplate(filterType) {
  const noPointTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`
  );
}

export default class EmptyEventPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyEventPointsTemplate(this.#filterType);
  }
}
