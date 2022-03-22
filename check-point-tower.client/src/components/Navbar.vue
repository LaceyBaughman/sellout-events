<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center mx-3">
        <h1 class="logo">Sellout</h1>
      </div>
    </router-link>
    <button
      title="Create Event"
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#form-modal"
    >
      Create Event
      <i class="mdi mdi-plus"></i>
    </button>
    <button
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      @click="resetEvents()"
    >
      All Events
    </button>
    <button
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      @click="filterEvents('concert')"
    >
      Concerts
    </button>
    <button
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      @click="filterEvents('convention')"
    >
      Conventions
    </button>
    <button
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      @click="filterEvents('sport')"
    >
      Sports
    </button>
    <button
      class="
        create-btn
        btn btn-success
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      @click="filterEvents('digital')"
    >
      Digital
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"></ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {

  setup() {
    return {
      events: computed(() => AppState.events),
      types: computed(() => AppState.events.type),

      filterEvents(type) {
        // try {
        const eventType = AppState.events.filter(e => e.type == type)
        // } catch (error) {
        //   logger.error("[Filter]", eventType);
        //   Pop.toast(error.message, "error");
        AppState.events.types = eventType
      },
      async resetEvents() {
        try {
          await eventsService.getAllEvents()
        } catch (error) {
          logger.log("[ResetEvents]")
          Pop.toast(error.message, 'error')

        }
      }
    }
  }
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.logo {
  font-family: "Bebas Neue", cursive;
  font-size: 5em;
}
</style>
