<template>
  <div class="container-fluid">
    <!-- <div class="row">
      <div class="scrollcards">
        <div class="card" v-for="t in types" :key="t.id">
          <Event :types="t" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { AppState } from "../AppState"
import { computed, onMounted } from "vue"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  name: 'Home',
  setup() {
    // onMounted(async () => {
    //   try {
    //     await eventsService.getAllEvents()
    //   } catch (error) {
    //     logger.error(error)
    //     Pop.toast(error.message, 'Error')
    //   }
    // })

    return {
      events: computed(() => AppState.events),
      types: computed(() => AppState.types),
    }
  }
}
</script>

<style scoped lang="scss">
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
