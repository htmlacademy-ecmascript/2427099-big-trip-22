import { render, replace } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #tripListComponent = new TripListView();

  #eventPoints = [];
  #destinations = [];

  constructor ({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.eventPoints];
    this.#destinations = [...this.#destinationModel.destinations];

    render(new ListSortView(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    this.#eventPoints.forEach((point) => {
      const destination = this.#destinationModel.getById(point.destination);
      this.#renderPoint(this.#destinations, destination, point, this.#offersModel.getByType(point.type));
    });
  }

  #renderPoint(destinations, destination, eventPoint, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripPointComponent = new TripPointView({
      destination,
      eventPoint,
      offers,
      onEditClick: () => {
        pointEditHandler();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripEditPointComponent = new EditFormView({
      destinations,
      destination,
      eventPoint,
      offers,
      onCloseClick: () => {
        pointCloseEditHandler();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormSubmit: () => {
        pointEditSubmitHandler();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(tripEditPointComponent, tripPointComponent);
    }

    function replaceFormToPoint() {
      replace(tripPointComponent, tripEditPointComponent);
    }

    function pointEditHandler() {
      replacePointToForm();
    }

    function pointCloseEditHandler() {
      replaceFormToPoint();
    }

    function pointEditSubmitHandler() {
      replaceFormToPoint();
    }

    render(tripPointComponent, this.#tripListComponent.element);
  }
}
