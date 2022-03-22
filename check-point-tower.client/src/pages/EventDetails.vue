<template>
  <div class="container">
    <div class="row justify-content-between shadow p-2 m-4">
      <div class="col-md-12">
        <div class="row">
          <h3 class="card-title py-2">
            {{ event.name }}, {{ event.location }}

            <div v-if="event.creatorId == account.id && !event.isCanceled">
              <button class="btn btn-secondary" @click="openModal">
                <i class="mdi mdi-pencil"></i>
              </button>
            </div>
          </h3>

          <div class="col-md-5">
            <img
              :src="event.coverImg"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-5 p-2">
            <div class="card-body">
              <p class="card-text scroller">
                {{ event.description }}
              </p>

              <p class="card-text" v-if="event.isCanceled">
                <small class="text-muted">
                  <img src="https://image.pngaaa.com/788/1603788-small.png" />
                </small>
              </p>
              <p class="card-text" v-else>
                <small class="text-muted"
                  ><b>Event Capacity:</b> {{ event.capacity }}
                  <b>Event Type:</b> {{ event.type }}
                  <p><b>Event Date:</b> {{ event.startDate }}</p></small
                >
              </p>
            </div>
          </div>

          <div class="col-md-4" v-for="c in comments" :key="c.id">
            <Comment :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService";

export default {
  name: "EventDetails",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {

        await eventsService.getEventById(route.params.id);
        await commentsService.getEventComments(route.params.id)
        await eventsService.getEventTickets(route.params.id);
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      events: computed(() => AppState.events),
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets.sort((a, b) => b.capacity - a.capacity)),
      comments: computed(() => AppState.comments),
      hasTicket: computed(() => AppState.tickets.find((a) => a.id == AppState.account.id)),


      createTicket() {
        let myTicket = {
          accountId: AppState.account.id,
          eventId: Appstate.activeEvent.id,
          capacity: AppState.activeEvent.capacity - 1,
        }
      },
    }
  }
}
</script>


<style scoped>
.cover-img {
  max-width: 200px;
}

.scroller {
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-img-top {
  max-height: 300px;
}
</style>