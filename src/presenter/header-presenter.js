import { render, RenderPosition } from '../framework/render.js';
import ListFilterView from '../view/list-filter-view.js';
import TripHeaderInfoView from '../view/trip-header-info-view.js';
import { generateFilter } from '../mock//filter.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #eventPointsModel = null;

  constructor({ headerContainer, eventPointsModel }) {
    this.#headerContainer = headerContainer;
    this.#eventPointsModel = eventPointsModel;
  }

  init () {
    const filters = generateFilter(this.#eventPointsModel.eventPoints);
    const siteFiltersElement = this.#headerContainer.querySelector('.trip-controls__filters');
    render(new ListFilterView({filters}), siteFiltersElement);
    render(new TripHeaderInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
