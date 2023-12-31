import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../constants.js';

function createSortTypeListTemplate(types) {
  return types.reduce((markup, {type, isDisabled, isChecked}) => `${markup}
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input
        visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
        ${isDisabled ? 'disabled' : ''}
        ${isChecked ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>
  `, '');
}

function createListSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortTypeListTemplate(SortTypes)}
    </form>`
  );
}

export default class ListSortView extends AbstractView {
  get template() {
    return createListSortTemplate();
  }
}
