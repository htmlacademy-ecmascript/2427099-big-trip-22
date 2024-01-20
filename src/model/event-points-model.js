import Observable from '../framework/observable.js';

export default class EventPointsModel extends Observable {
  #eventPoints = [];

  constructor(service) {
    super();
    this.#eventPoints = service.getEventPoints();
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  getById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }

  updatePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot update unexisting point');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      update,
      ...this.#eventPoints.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#eventPoints = [
      update,
      ...this.#eventPoints
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#eventPoints.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Cannot delete unexisting point');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      ...this.#eventPoints.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
