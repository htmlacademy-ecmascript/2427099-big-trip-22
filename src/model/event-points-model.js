import Observable from '../framework/observable.js';
import { updateItem } from '../utils/common.js';
import { UpdateType } from '../constants.js';

export default class EventPointsModel extends Observable {
  #service = null;
  #eventPoints = [];
  #destinationModel = null;
  #offersModel = null;

  constructor({service, destinationModel, offersModel}) {
    super();
    this.#service = service;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  getById(id) {
    return (
      this.#eventPoints.find((eventPoint) => eventPoint.id === id) || null
    );
  }

  async init() {
    try {
      await this.#destinationModel.init();
      await this.#offersModel.init();
      const eventPoints = await this.#service.points;
      this.#eventPoints = eventPoints.map(this.#adaptToClient);
    } catch (err) {
      this.#eventPoints = [];
    }

    this._notify(UpdateType.INIT);
  }

  async update(updateType, point) {
    try {
      const response = await this.#service.updatePoint(point);
      const updatedPoint = this.#adaptToClient(response);
      this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  add(updateType, point) {
    const addedPoint = this.#service.addPoint(point);
    this.#eventPoints = [
      ...this.#eventPoints,
      addedPoint
    ];
    this._notify(updateType, addedPoint);
  }

  delete(updateType, point) {
    this.#service.deletePoint(point);
    this.#eventPoints = this.#eventPoints.filter((eventPoint) => eventPoint.id !== point.id);
    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      'basePrice': parseInt(point['base_price'], 10),
      'dateTo': new Date(point['date_to']),
      'dateFrom': new Date(point['date_from']),
      'isFavorite': point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
