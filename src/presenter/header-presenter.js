import { render, RenderPosition } from '../framework/render.js';
import TripHeaderInfoView from '../view/trip-header-info-view.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #eventPointsModel = null;

  constructor({ headerContainer, eventPointsModel }) {
    this.#headerContainer = headerContainer;
    this.#eventPointsModel = eventPointsModel;
  }

  init () {
    render(new TripHeaderInfoView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
