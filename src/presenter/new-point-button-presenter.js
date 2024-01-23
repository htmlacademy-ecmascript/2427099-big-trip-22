import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #headerContainer = null;
  #newPointButtonComponent = null;
  #tripListPresenter = null;

  constructor({ headerContainer, tripListPresenter }) {
    this.#headerContainer = headerContainer;
    this.#tripListPresenter = tripListPresenter;
  }

  init () {
    this.#newPointButtonComponent = new NewPointButtonView({onClick: this.handleNewPointButtonClick});
    render(this.#newPointButtonComponent, this.#headerContainer);
  }

  handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  handleNewPointButtonClick = () => {
    this.#tripListPresenter.createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };
}
