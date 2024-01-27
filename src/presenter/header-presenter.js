import { render, RenderPosition } from '../framework/render.js';
import TripHeaderInfoView from '../view/trip-header-info-view.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripHeaderInfoComponent = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
    this.#tripHeaderInfoComponent = new TripHeaderInfoView();
  }

  init () {
    render(this.#tripHeaderInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
