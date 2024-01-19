import RadioListView from './radio-list-view.js';

function createSortTypeListTemplate(types) {
  return types.reduce((markup, {sortType, isChecked, isDisabled}) => `${markup}
    <div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        data-type="${sortType}"
        ${isDisabled ? 'disabled' : ''}
        ${isChecked ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>
  `, '');
}

function createListSortTemplate(types) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortTypeListTemplate(types)}
    </form>`
  );
}

export default class ListSortView extends RadioListView {
  get template() {
    return createListSortTemplate(this._types);
  }
}
