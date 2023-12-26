import { render, RenderPosition } from '../framework/render.js';
import ListFilterView from '../view/list-filter-view.js';
import TripHeaderInfoView from '../view/trip-header-info-view.js';

export default class HeaderPresenter {
  #headerContainer = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
  }

  init () {
    const siteFiltersElement = this.#headerContainer.querySelector('.trip-controls__filters');
    render(new ListFilterView(), siteFiltersElement);
    render(new TripHeaderInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
