import { AppState } from "../AppState"
import { api } from "./AxiosService"


class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    AppState.events = res.data
  }

  // async getById(id) {
  //   const res = await api.get('api/cars/' + id)
  //   AppState.activeCar = res.data
  // }

  // async create(carData) {
  //   const res = await api.post('api/cars', carData)
  //   AppState.cars.push(res.data)
  //   // NOTE returns car to the form so you can push from there
  //   return res.data
  // }

  // async update(carData) {
  //   const res = await api.put('api/cars/' + carData.id, carData)
  //   AppState.activeCar = res.data
  // }
}

export const eventsService = new EventsService()