import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import { UserAction, UpdateType, Mode } from '../constants.js';

export default class NewPointPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #handlerDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;

  constructor({tripContainer, destinationModel, offersModel, handlerDataChange, handleDestroy}) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handlerDataChange = handlerDataChange;
    this.#handleDestroy = handleDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      modeType: Mode.ADDITING,
    });

    render(this.#pointEditComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handlerDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {id: crypto.randomUUID(), ...point}
    );

    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

