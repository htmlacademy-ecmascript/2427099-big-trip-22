import AbstractView from '../framework/view/abstract-view.js';

export default class RadioListView extends AbstractView {
  _types = [];
  _handleTypeChange = null;

  constructor({ types, onTypeChange }) {
    super();
    this._types = types;
    this._handleTypeChange = onTypeChange;

    this.element.addEventListener('change', this.#typeChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this._handleTypeChange(evt.target.dataset.type);
  };
}
