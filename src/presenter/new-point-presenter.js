import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import { UserAction, UpdateType, Mode } from '../constants.js';

export default class NewPointPresenter {
  #tripContainer = null;
  #destinationModel = [];
  #offersModel = [];
  #onDataChange = null;
  #onDestroy = null;
  #pointEditComponent = null;

  constructor({tripContainer, destinationModel, offersModel, onDataChange, onDestroy}) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      destinations: this.#destinationModel.destinations,
      offers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
      modeType: Mode.ADDITING,
    });

    render(this.#pointEditComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy({ isCanceled = true }) {

    if (!this.#pointEditComponent) {
      return;
    }

    this.#onDestroy({ isCanceled });

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#onDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point
    );
  };

  #handleCancelClick = () => {
    this.destroy({ isCanceled: true });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy({ isCanceled: true });
    }
  };
}

