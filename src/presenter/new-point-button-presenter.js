import { render } from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {
  #headerContainer = null;
  #newPointButtonComponent = null;
  #handleButtonClick = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
  }

  init ({ onButtonClick }) {
    this.#handleButtonClick = onButtonClick;
    this.#newPointButtonComponent = new NewPointButtonView({ onClick: this.#buttonClickHandler });
    render(this.#newPointButtonComponent, this.#headerContainer);
  }

  enableButton = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  disableButton = () => {
    this.#newPointButtonComponent.element.disabled = true;
  };

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };
}
