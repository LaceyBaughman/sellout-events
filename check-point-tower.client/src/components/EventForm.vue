<template>
  <form>
    <div class="d-flex">
      <div class="form-group flex-grow-1">
        <label for="type" class="">Event Type:</label>
        <select
          v-model="editable.type"
          name="type"
          id="type"
          required
          class="form-control"
        >
          <option disabled :selected="!editable.id" value="">
            List of event types:
          </option>
          <option>concert</option>
          <option>convention</option>
          <option>sport</option>
          <option>digital</option>
        </select>
      </div>
      <div class="form-group flex-grow-1 ms-3">
        <label for="name" class="">Name:</label>
        <input
          v-model="editable.name"
          placeholder="Name"
          type="text"
          class="form-control"
          name="name"
          id="name"
          required
        />
      </div>
    </div>
    <div class="d-flex mt-2">
      <div class="form-group flex-grow-1">
        <label for="capacity" class="">Capacity:</label>
        <input
          v-model="editable.capacity"
          placeholder="Capacity"
          type="number"
          class="form-control"
          name="capacity"
          id="capacity"
          min="10"
          max="1000"
        />
      </div>
      <div class="form-group mx-3">
        <label for="date" class="">Start Date:</label>
        <input
          v-model="editable.startDate"
          placeholder="startDate"
          type="Date"
          class="form-control"
          name="startDate"
          id="startDate"
        />
      </div>
      <div class="form-group">
        <label for="location" class="">Location:</label>
        <input
          v-model="editable.location"
          placeholder="location"
          type="location"
          class="form-control"
          name="location"
          id="location"
        />
      </div>
    </div>
    <div class="form-group mt-2">
      <label for="description">Description:</label>
      <textarea
        v-model="editable.description"
        placeholder="Description"
        type="text"
        class="form-control"
        name="description"
        id="description"
        rows="5"
      ></textarea>
    </div>
    <div class="form-group mt-2">
      <label for="img" class="">Image URL:</label>
      <input
        v-model="editable.coverImg"
        placeholder="https://imgurl.com"
        type="url"
        class="form-control"
        name="img"
        id="img"
        required
      />
    </div>
    <div class="d-flex justify-content-between my-3">
      <button
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        class="btn text-dark lighten-20 text-uppercase selectable"
      >
        <b> Cancel </b>
      </button>
      <button
        v-if="!eventData.id"
        @click="createEvent"
        type="button"
        class="btn btn-success text-dark text-uppercase selectable"
      >
        <b> Create Event </b>
      </button>
      <button
        v-else
        @click="editEvent"
        type="button"
        class="btn btn-info text-warning text-uppercase selectable"
      >
        <b> Edit Event </b>
      </button>
    </div>
  </form>
</template>


<script>
import { AppState } from "../AppState"
import { computed, reactive, onMounted, ref, watchEffect } from "vue"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
export default {
  props: {
    eventData: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      editable.value = props.eventData
    })
    return {
      editable,
      async createEvent() {
        try {
          let newEvent = await eventsService.createEvent(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide()
          router.push({ name: "EventDetails", params: { id: newEvent.id } })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },
      async editEvent() {
        try {
          await eventsService.update(editable.value)
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },
    }
  },
};
</script>


<style scoped>
</style>