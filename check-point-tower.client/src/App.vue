<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="row">
      <div class="co-md-12 d-flex justify-content-around">
        <button class="btn btn-color" @click="filterEvents('concert')">
          Concerts
        </button>
        <button class="btn btn-color" @click="filterEvents('convention')">
          Conventions
        </button>
        <button class="btn btn-color" @click="filterEvents('sport')">
          Sports
        </button>
        <button class="btn btn-color" @click="filterEvents('digital')">
          Digital
        </button>
      </div>
    </div>
    <div class="row">
      <div class="scrollcards">
        <div class="card" v-for="e in events" :key="e.id">
          <Event :event="e" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import { computed, onMounted } from "vue"
import { AppState } from "./AppState"
import { eventsService } from "./services/EventsService"
import Pop from "./utils/Pop"
import { logger } from "./utils/Logger"
import { useRouter } from "vue-router"

export default {
  name: 'App',
  setup() {
    const searchTerm = ref('');
    const router = useRouter()
    onMounted(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.error(error)
      }
    })

    return {
      events: computed(() => AppState.events),
      searchTerm,
      async filterEvents() {
        try {
          await eventsService.filterEvents(searchTerm.value);
        } catch (error) {
          logger.error("[Filter]", error);
          Pop.toast(error.message, "error");
        }
      },
      searchTerm,
    }
  },
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
section {
  margin-top: 40px;
}
.card {
  max-height: 50vh;
  border: 2px solid red;
  margin: 10px 4px;
  transition: 0.6s ease;
}

.card:hover {
  transform: scale(1.05);
}

.card-block {
  padding: 10px;
}

.scrollcards {
  background-color: #fff;
  overflow: auto;
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

div.scrollcards .card {
  display: inline-block;
  padding: 14px;
  text-decoration: none;
  height: auto;
  width: 500px;
}
</style>
