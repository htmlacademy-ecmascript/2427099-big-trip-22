import { render } from '../framework/render.js';
import ListFilterView from '../view/list-filter-view.js';
import { generateFilter } from '../mock//filter.js';

export default class FilterPresenter {
  #headerContainer = null;
  #eventPoints = null;

  constructor({headerContainer, eventPoints}) {
    this.#headerContainer = headerContainer;
    this.#eventPoints = eventPoints;
  }

  init() {
    this.#renderFilters();
  }

  #renderFilters() {
    const filters = generateFilter(this.#eventPoints);

    render(new ListFilterView({filters}), this.#headerContainer);
  }
}
