import { render } from '../render.js';
import AddFromView from '../view/add-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor ({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.tripContainer = tripContainer;
    this.destinationModel = destinationModel;
    this.eventPointsModel = eventPointsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventPoints = [...this.eventPointsModel.get()];
    this.offers = [...this.offersModel.get()];
    this.destinations = [...this.destinationModel.get()];
    render(new ListSortView(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EditFormView({
      destinations: this.destinations,
      eventPoints: this.eventPoints[0],
      offers: this.offers
    }), this.tripListComponent.getElement());

    for (let i = 1; i < this.eventPoints.length; i++) {
      const destination = this.destinationModel.getById(i + 1);
      render(
        new TripPointView({
          destination,
          eventPoints: this.eventPoints[i],
          offers: this.offers
        }),
        this.tripListComponent.getElement()
      );
    }

    render(new AddFromView({
      destinations: this.destinations,
      offers: this.offers
    }), this.tripListComponent.getElement());
  }
}
