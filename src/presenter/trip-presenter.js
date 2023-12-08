import { render } from '../render.js';
import AddFromView from '../view/add-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

const EVENT_COUNT = 3;

export default class TripPresenter {
  sortComponent = new ListSortView();
  tripListComponent = new TripListView();

  constructor ({ tripContainer }) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EditFormView(), this.tripListComponent.getElement());

    for (let i = 0; i < EVENT_COUNT; i++) {
      render(new TripPointView(), this.tripListComponent.getElement());
    }

    render(new AddFromView(), this.tripListComponent.getElement());
  }
}
